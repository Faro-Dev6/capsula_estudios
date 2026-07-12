export default function BlogPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <span className="text-xs text-primary uppercase tracking-[0.3em] font-mono block mb-2">Cuadernos de Rodaje</span>
            <h2 className="text-3xl sm:text-4xl text-foreground font-extrabold">Cine Blog Directores</h2>
            <div className="w-16 h-[2.5px] bg-primary mx-auto mt-3" />
        </div>

        <div className="space-y-12">
            {/* Blog Post 1 */}
            <article className="bg-surface/70 border border-border rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:border-accent/35 transition-all">
                <div className="w-full md:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
                    alt="Espacio oscuro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] text-accent uppercase tracking-wider font-mono font-bold block mb-2">Artículos • Iluminación</span>
                        <h3 className="text-xl font-bold text-foreground-muted mb-3">La Estética del Cine de Terror Moderno y el Estigma Neon Noir</h3>
                        <p className="text-xs text-foreground-muted leading-relaxed mb-4">
                            ¿Cómo influye la paleta de colores sobre el inconsciente cerebral de nuestro público? En este ensayo técnico, desglosamos el uso del rojo escarlata y el contraste de penumbra profunda, tal como lo empleamos en nuestra próxima gran obra, \"El Eco de las Sombras\", inspirándonos en estéticas legendarias de thriller oscuro.
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-foreground-muted border-t border-border/50 pt-4">
                        <span>Por Juan Martín (Director)</span>
                        <span>25 Mayo, 2026</span>
                    </div>
                </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-surface/70 border border-border rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:border-accent/35 transition-all">
                <div className="w-full md:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden bg-black">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
                        alt="Fotografía patagónica"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] text-accent uppercase tracking-wider font-mono font-bold block mb-2">Producción • Locaciones</span>
                        <h3 className="text-xl font-bold text-foreground-muted mb-3">El Desafío Intangible de Grabar Sonido Natural en la Estepa de la Patagonia</h3>
                        <p className="text-xs text-foreground-muted leading-relaxed mb-4">
                        Viajar al extremo sur para filmar \"Los Susurros del Viento\" requirió equipamientos de audio nunca antes testeados en vientos de 90 km/h. Lucía Soler describe la travesía técnica necesaria para filtrar el silbido natural y usarlo como una flauta dramática ambiental.
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-foreground-muted border-t border-border/50 pt-4">
                        <span>Por Lucía Soler (Productores)</span>
                        <span>18 Mayo, 2026</span>
                    </div>
                </div>
            </article>
        </div>
    </section>
  );
}