import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ModelsPage from "./pages/ModelsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/models" element={<ModelsPage />} />
  <Route path="/models/:id" element={<ProductDetailsPage />} />
  <Route path="/reviews" element={<ReviewsPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/profile" element={<ProfilePage />} />
</Routes>
      </main>
      <Footer />
    </div>
  );
}