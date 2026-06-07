export default function HomeCategories({
  setMovieFilter,
  setCurrentTab,
  addLog,
}) {
  return (
    <section className="w-full flex flex-col md:flex-row gap-[1px] bg-white/10 select-none">

      <div
        onClick={() => {
          setMovieFilter("pelicula");
          setCurrentTab("producciones");
          addLog(
            "Redireccionado a Películas desde Cartas Destacadas."
          );
        }}
        className="flex-1 min-h-[280px] relative group overflow-hidden bg-[#161616] cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=600')",
          }}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-10 h-[1px] bg-[#9D0208] mb-3"></div>

          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">
            Películas
          </h2>

          <p className="text-xs text-[#8E8E8E] uppercase tracking-widest mt-1 italic">
            LARGOMETRAJES PREMIADOS
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          setMovieFilter("corto");
          setCurrentTab("producciones");
          addLog(
            "Redireccionado a Cortometrajes desde Cartas Destacadas."
          );
        }}
        className="flex-1 min-h-[280px] relative group overflow-hidden bg-[#161616] cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=600')",
          }}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-10 h-[1px] bg-[#9D0208] mb-3"></div>

          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">
            Cortos
          </h2>

          <p className="text-xs text-[#8E8E8E] uppercase tracking-widest mt-1 italic">
            NARRATIVAS COMPACTAS
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          setCurrentTab("merch");
        }}
        className="flex-1 min-h-[280px] relative group overflow-hidden bg-[#161616] cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600')",
          }}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-10 h-[1px] bg-[#9D0208] mb-3"></div>

          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">
            Merch
          </h2>

          <p className="text-xs text-[#8E8E8E] uppercase tracking-widest mt-1 italic">
            COLECCIÓN LIMITADA
          </p>
        </div>
      </div>

    </section>
  );
}