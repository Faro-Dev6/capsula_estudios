import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Lock, Unlock, X } from "lucide-react";

export default function MovieModal({
  selectedMovie,
  setSelectedMovie,
  unlockedMovies,
  handlePlayMovie,
  triggerCheckout,
}) {
  return (
    <AnimatePresence>
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* BACKDROP */}
          <div
            onClick={() => setSelectedMovie(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-surface border border-border/10 rounded-2xl overflow-hidden relative z-10 shadow-2xl"
          >

            {/* CLOSE */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:text-primary transition z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* HEADER IMAGE */}
            <div className="h-56 relative">
              <img
                src={selectedMovie.backdrop}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />

              <div className="absolute bottom-4 left-6 flex items-baseline gap-3">
                <h3 className="text-2xl font-extrabold text-foreground">
                  {selectedMovie.title}
                </h3>

                <span className="text-xs text-accent font-mono">
                  [{selectedMovie.rating}]
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">

              {/* INFO */}
              <div className="flex flex-wrap gap-3 text-xs text-foreground-muted">
                <span className="px-2 py-0.5 bg-primary/15 text-primary font-bold rounded">
                  {selectedMovie.genre}
                </span>
                <span>{selectedMovie.year}</span>
                <span>{selectedMovie.duration}</span>
                <span>Dir. {selectedMovie.director}</span>
              </div>

              {/* SYNOPSIS */}
              <p className="text-sm text-foreground-muted leading-relaxed">
                {selectedMovie.synopsis}
              </p>

              {/* ACTIONS */}
              <div className="bg-background p-4 rounded-xl border border-border flex items-center justify-between">

                {/* PRICE / STATUS */}
                <div>
                  {unlockedMovies.includes(selectedMovie.id) || selectedMovie.price === 0 ? (
                    <span className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
                      <Unlock className="w-3.5 h-3.5" />
                      Acceso desbloqueado
                    </span>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-foreground-muted uppercase">
                        Alquiler digital
                      </span>
                      <span className="text-lg font-mono text-accent font-bold">
                        ${selectedMovie.price.toLocaleString("es-AR")} ARS
                      </span>
                    </div>
                  )}
                </div>

                {/* BUTTON */}
                {unlockedMovies.includes(selectedMovie.id) || selectedMovie.price === 0 ? (
                  <button
                    onClick={() => {
                      handlePlayMovie(selectedMovie);
                      setSelectedMovie(null);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs uppercase font-bold flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Reproducir
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      triggerCheckout(
                        selectedMovie.title,
                        selectedMovie.price,
                        false,
                        selectedMovie.id
                      );
                      setSelectedMovie(null);
                    }}
                    className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded text-xs uppercase font-bold flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-accent" />
                    Alquilar
                  </button>
                )}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}