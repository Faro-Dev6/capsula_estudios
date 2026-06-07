import { useMemo, useState } from "react";

export default function useCart({ addLog, triggerCheckout }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    const existingIndex = cart.findIndex(
      (c) => c.item.id === item.id
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }

    addLog?.(`Item añadido al carrito: ${item.name}`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((c) =>
        c.item.id === id
          ? {
              ...c,
              quantity: Math.max(1, c.quantity + delta),
            }
          : c
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((c) => c.item.id !== id)
    );

    addLog?.(`Item removido del carrito: ${id}`);
  };

  const clearCart = () => {
    setCart([]);
    addLog?.("Carrito vaciado");
  };

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (acc, c) => acc + c.item.price * c.quantity,
      0
    );
  }, [cart]);

  const handleCheckoutCart = () => {
    if (cart.length === 0) return;

    const total = cartTotal;

    const descStr = cart
      .map((c) => `${c.item.name} x${c.quantity}`)
      .join(", ");

    setIsCartOpen(false);

    triggerCheckout?.(
      `Merch: ${descStr.substring(0, 40)}...`,
      total,
      true,
      "merch-cart"
    );
  };

  return {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    handleCheckoutCart,
  };
}