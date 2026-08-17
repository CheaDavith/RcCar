import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/models?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      closeMenu();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      closeMenu();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <NavLink to="/" className="navbar__logo-badge" onClick={closeMenu}>RC</NavLink>
      </div>

      <button className="navbar__toggle-btn" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
        <NavLink to="/" end className="navbar__link" onClick={closeMenu}>HOME</NavLink>
        <NavLink to="/models" className="navbar__link" onClick={closeMenu}>MODELS</NavLink>
        <NavLink to="/reviews" className="navbar__link" onClick={closeMenu}>REVIEWS</NavLink>
        <NavLink to="/about" className="navbar__link" onClick={closeMenu}>ABOUT US</NavLink>
      </nav>

      <form onSubmit={handleSearchSubmit} className="navbar__search">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search models..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="navbar__icons">
        <button aria-label="Notifications" className="navbar__icon-btn">
          <Bell size={20} />
        </button>
        <NavLink to="/cart" aria-label="Cart" className="navbar__icon-btn navbar__cart-btn" onClick={closeMenu}>
          <ShoppingCart size={20} />
          {itemCount > 0 && <span className="navbar__cart-badge">{itemCount}</span>}
        </NavLink>

        {currentUser ? (
          <div className="navbar__user-menu">
            <NavLink to="/profile" className="navbar__username-link" title="View Profile" onClick={closeMenu}>
              {currentUser.displayName || currentUser.email.split("@")[0]}
            </NavLink>
            <button onClick={handleLogout} aria-label="Sign out" className="navbar__icon-btn" title="Sign out">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <NavLink to="/login" aria-label="Account" className="navbar__icon-btn" onClick={closeMenu}>
            <User size={20} />
          </NavLink>
        )}
      </div>
    </header>
  );
}