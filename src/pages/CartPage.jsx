import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import "./CartPage.css";

export default function CartPage() {
  const { cartLines, subtotal, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cartLines.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-card">
          <div className="cart-empty-icon">
            <ShoppingCart size={48} />
          </div>
          <h1>Your Cart is Empty</h1>
          <p>Explore our models and find your next high-performance RC car.</p>
          <Link to="/models" className="cart-empty-btn">
            <ArrowLeft size={16} /> Browse Models
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count-badge">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-items-list">
            {cartLines.map(({ id, car, quantity, lineTotal }) => (
              <div key={id} className="cart-item-card">
                <div className="cart-item-image-wrap">
                  <img src={car.image} alt={car.name} className="cart-item-image" />
                </div>
                <div className="cart-item-details">
                  <span className="cart-item-type">{car.type}</span>
                  <h3>{car.name}</h3>
                  <p className="cart-item-price">${car.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(id, quantity - 1)}
                    aria-label="Decrease quantity"
                    className="qty-btn"
                  >
                    <Minus size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(id, quantity + 1)}
                    aria-label="Increase quantity"
                    className="qty-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="cart-item-total">
                  <span className="line-total-label">Total:</span>
                  <span className="line-total-value">${lineTotal.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => removeFromCart(id)}
                  aria-label="Remove item"
                  className="cart-remove-btn"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="cart-actions-bar">
              <button onClick={clearCart} className="cart-clear-btn">
                Clear Cart
              </button>
              <Link to="/models" className="cart-continue-link">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="cart-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => alert("Checkout flow coming up next!")} 
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}