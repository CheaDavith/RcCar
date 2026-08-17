import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CARS } from "../data/cars";

const CartContext = createContext(null);

const STORAGE_KEY = "rc-car-cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (carId, quantity = 1) => {
    setCart((current) => {
      const safeQuantity = Math.max(1, Number(quantity) || 1);
      const existing = current.find((item) => item.id === carId);

      if (existing) {
        return current.map((item) =>
          item.id === carId ? { ...item, quantity: item.quantity + safeQuantity } : item
        );
      }

      return [...current, { id: carId, quantity: safeQuantity }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCart((current) => {
      const nextQuantity = Number(quantity);

      if (Number.isNaN(nextQuantity) || nextQuantity <= 0) {
        return current.filter((item) => item.id !== itemId);
      }

      return current.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQuantity } : item
      );
    });
  };

  const removeFromCart = (itemId) => {
    setCart((current) => current.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const cartLines = useMemo(
    () =>
      cart
        .map((item) => {
          const car = CARS.find((entry) => entry.id === item.id);
          if (!car) return null;

          return {
            id: item.id,
            car,
            quantity: item.quantity,
            lineTotal: car.price * item.quantity,
          };
        })
        .filter(Boolean),
    [cart]
  );

  const subtotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.lineTotal, 0),
    [cartLines]
  );

  const itemCount = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.quantity, 0),
    [cartLines]
  );

  const value = {
    cart,
    cartLines,
    subtotal,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
