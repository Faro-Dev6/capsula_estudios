import { motion } from "motion/react";
import {
  Play,
  Lock,
  Unlock,
  Info
} from "lucide-react";

export default function ProductionsPage({
  movies,
  movieFilter,
  setMovieFilter,
  unlockedMovies,
  handlePlayMovie,
  triggerCheckout,
  setSelectedMovie
}) {

  // ✅ función única para checkout (sin cambiar lógica)
  const handleCheckout = (movie) => {
    triggerCheckout(
      movie.title,
      movie.price,
      false,
      movie.id
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-border pb-6 mb-12">
        <div>
          <span className="text-xs text-primary uppercase tracking-[0.25em] font-mono block mb-1">
            Catálogo Exclusivo
          </span>

          <h2 className="text-3xl sm:text-4xl text-foreground font-extrabold">
            Nuestras Producciones
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-border">
          {["todos", "pelicula", "corto"].map((t) => (
            <button
              key={t}
              onClick={() => setMovieFilter(t)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                movieFilter === t
                  ? "bg-primary text-white"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {t === "todos"
                ? "Todos"
                : t === "pelicula"
                ? "Películas"
                : "Cortometrajes"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies
          .filter(
            (m) =>
              movieFilter === "todos" ||
              m.type === movieFilter
          )
          .map((movie) => {
            const isUnlocked =
              unlockedMovies.includes(movie.id) ||
              movie.price === 0;

            return (
              <motion.div
                layout
                key={movie.id}
                className="bg-surface border border-border hover:border-primary/40 rounded-xl overflow-hidden shadow-xl hover:translate-y-[-4px] transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-72 sm:h-80 overflow-hidden bg-black">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {isUnlocked ? (
                      <span className="px-2.5 py-1 bg-emerald-600/90 text-white rounded text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1 z-10 shadow">
                        <Unlock className="w-3 h-3" />
                        Acceso Libre
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-primary/90 text-white rounded text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1 z-10 shadow">
                        <Lock className="w-3 h-3 text-accent" />
                        Alquiler Digital
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 z-10">
                    {isUnlocked ? (
                      <button
                        onClick={() => handlePlayMovie(movie)}
                        className="p-4 bg-primary hover:bg-primary-hover rounded-full text-white transform scale-90 group-hover:scale-100 transition-all cursor-pointer"
                      >
                        <Play className="w-6 h-6 fill-white" />
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2 items-center px-4 text-center">
                        <span className="text-xs uppercase tracking-widest text-accent font-bold">
                          Un solo pago de
                        </span>

                        <span className="text-xl text-white font-mono font-bold">
                          ${movie.price.toLocaleString("es-AR")} ARS
                        </span>

                        <button
                          onClick={() => handleCheckout(movie)}
                          className="px-4 py-2 mt-2 bg-white text-black hover:bg-accent hover:text-black rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Obtener Acceso
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] text-accent tracking-widest uppercase font-mono font-bold">
                        {movie.type === "pelicula"
                          ? "Largometraje"
                          : "Cortometraje"}
                      </span>

                      <span className="text-[10px] text-foreground-muted font-semibold">
                        {movie.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground line-clamp-1 mb-2">
                      {movie.title}
                    </h3>

                    <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed mb-4">
                      {movie.synopsis}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4 mt-auto flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedMovie(movie)}
                      className="text-xs text-foreground-muted hover:text-foreground transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      <Info className="w-3.5 h-3.5" />
                      Ficha Técnica
                    </button>

                    {isUnlocked ? (
                      <button
                        onClick={() => handlePlayMovie(movie)}
                        className="px-3.5 py-1.5 bg-emerald-700/85 hover:bg-emerald-600 text-white rounded text-xs transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Reproducir
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCheckout(movie)}
                        className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white rounded text-xs transition-colors flex items-center gap-1 font-semibold cursor-pointer shadow-md"
                      >
                        <Lock className="w-3 h-3 text-accent" />
                        Rentar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
}