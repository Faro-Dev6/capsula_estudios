export default function HomeCategories({
  setMovieFilter,
  setCurrentTab,
  addLog,
}) {
  return (
    <section className="w-full flex flex-col md:flex-row gap-[1px] border-t border-border select-none">

      <div
        onClick={() => {
          setMovieFilter("pelicula");
          setCurrentTab("producciones");
          addLog(
            "Redireccionado a Películas desde Cartas Destacadas."
          );
        }}
        className="flex-1 min-h-[280px] relative group overflow-hidden bg-surface cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dmc9xgwzu/image/upload/c_fill,f_auto,q_80,w_600/v1781375218/poster_delta_ecplap.png')",
          }}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-10 h-[1px] bg-primary mb-3"></div>

          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-foreground">
            Películas
          </h2>

          <p className="text-xs text-foreground-muted uppercase tracking-widest mt-1 italic">
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
        className="flex-1 min-h-[280px] relative group overflow-hidden bg-surface cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dmc9xgwzu/image/upload/c_fill,f_auto,q_80,w_600/v1781558335/capsula_foto1_prb41c.png')",
          }}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-10 h-[1px] bg-primary mb-3"></div>

          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-foreground">
            Cortos
          </h2>

          <p className="text-xs text-foreground-muted uppercase tracking-widest mt-1 italic">
            NARRATIVAS COMPACTAS
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          setCurrentTab("merch");
        }}
        className="flex-1 min-h-[280px] relative group overflow-hidden bg-surface cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dmc9xgwzu/image/upload/c_fill,f_auto,q_80,w_600/v1781560242/merch_demo_hmxbef.png')",
          }}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <div className="w-10 h-[1px] bg-primary mb-3"></div>

          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-foreground">
            Merch
          </h2>

          <p className="text-xs text-foreground-muted uppercase tracking-widest mt-1 italic">
            COLECCIÓN LIMITADA
          </p>
        </div>
      </div>

    </section>
  );
}