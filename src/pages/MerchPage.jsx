import { ShoppingCart } from "lucide-react";

export default function MerchPage({
  merchItems,
  addToCart
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <span className="text-xs text-primary uppercase tracking-[0.3em] font-mono block mb-2">
          Exclusiva Boutique
        </span>

        <h2 className="text-3xl sm:text-4xl text-foreground font-extrabold font-sans">
          Colección de Cineastas
        </h2>

        <div className="w-16 h-[2px] bg-primary mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {merchItems.map((item) => (
          <div
            key={item.id}
            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all flex flex-col justify-between group"
          >
            <div className="relative h-64 overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 right-3 bg-black/80 border border-[#333] px-2.5 py-1 rounded text-[11px] font-mono text-accent font-semibold">
                ${item.price.toLocaleString("es-AR")}
              </div>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-foreground-muted block mb-2">
                  {item.category}
                </span>

                <h3 className="text-base font-bold text-foreground-muted mb-2 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => addToCart(item)}
                className="w-full py-2 bg-surface-secondary hover:bg-primary text-foreground hover:text-white border border-border-muted hover:border-transparent text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}