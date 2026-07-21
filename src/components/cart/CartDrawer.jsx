import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  cartTotal,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  setCurrentTab,
  handleCheckoutCart,
}) {
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 z-50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-surface border-l border-border text-foreground z-50 p-6 flex flex-col justify-between shadow-2xl"
          >
            {/* HEADER */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
                <h3 className="text-lg font-bold uppercase tracking-wider font-mono flex items-center gap-2 text-foreground">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Tu Pedido
                </h3>

                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* EMPTY */}
              {cart.length === 0 ? (
                <div className="text-center py-12 text-foreground-muted space-y-4">
                  <ShoppingCart className="w-12 h-12 mx-auto text-border-muted" />
                  <p className="text-xs">
                    Tu bolsa de compras cinematográficas está vacía actualmente.
                  </p>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentTab("merch");
                    }}
                    className="px-4 py-2 bg-primary text-white rounded text-xs"
                  >
                    Explorar la Tienda
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((c) => (
                    <div
                      key={c.item.id}
                      className="flex gap-4 p-3 bg-black/45 border border-border-muted rounded-xl relative"
                    >
                      <img
                        src={c.item.image}
                        className="w-16 h-16 object-cover rounded-lg"
                        alt={c.item.name}
                      />

                      <div className="flex-grow">
                        <h4 className="text-xs font-bold truncate">
                          {c.item.name}
                        </h4>

                        <span className="text-[11px] text-accent block mt-1">
                          ${c.item.price.toLocaleString("es-AR")} ARS
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(c.item.id, -1)
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="text-xs px-1.5">
                            {c.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateCartQuantity(c.item.id, 1)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(c.item.id)}
                        className="absolute top-3 right-3"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-xs">Subtotal:</span>
                  <span className="text-2xl text-accent">
                    ${cartTotal.toLocaleString("es-AR")} ARS
                  </span>
                </div>

                <button
                  onClick={handleCheckoutCart}
                  className="w-full py-3 bg-primary text-white text-xs uppercase"
                >
                  Comprar por Mercado Pago
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-foreground-muted"
                >
                  Vaciar Carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}