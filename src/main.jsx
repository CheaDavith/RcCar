import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // 1. ផ្លាស់ប្តូរពី BrowserRouter មកជា HashRouter
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter> {/* 2. ប្រើ HashRouter ជំនួស BrowserRouter នៅទីនេះ */}
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>
);