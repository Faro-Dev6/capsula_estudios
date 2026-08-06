import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Lock, Unlock, X, Heart } from "lucide-react";
import { canUserWatchMovie, CONTENT } from "../services/access.service";
import { useState } from "react";
import {MessageSquare} from "lucide-react";

export default function MovieModal({
  selectedMovie,
  setSelectedMovie,
  unlockedMovies,
  handlePlayMovie,
  triggerCheckout,
  currentUser,
}) {
  const [review, setReview] = useState("");

  const access = selectedMovie
    ? canUserWatchMovie({
        movie: selectedMovie,
        user: currentUser,
        rentedMovies: currentUser?.rentals ?? [] ,
      })
    : null;
  const handleReview = () => {
    if (!review.trim()) return;

  const reviewData = {
    movieId: selectedMovie.id,
    user: currentUser.email,
    comment: review,
    createdAt: new Date().toISOString(),
  };

  currentUser.reviews.push(reviewData);
  selectedMovie.reviews.push(reviewData);

  setReview("");
};


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

            {/* FAVORITOS */}
            <button
              onClick={() => {
                if (!currentUser.favoriteMovies.includes(selectedMovie.id)) {
                  currentUser.favoriteMovies.push(selectedMovie.id);
                }
              }}
              className="absolute top-4 right-16 p-2 bg-black/60 rounded-full text-red-500 hover:text-red-400 transition z-10"
            >
              <Heart className="w-4 h-4" />
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
                {access?.allowed ? (
                  <span className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
                    <Unlock className="w-3.5 h-3.5" />
                    Disponible
                  </span>
                ) : selectedMovie.contentType === CONTENT.PREMIERE ? (
                  <div className="flex flex-col">
                    <span className="text-[10px] text-foreground-muted uppercase">
                      Exclusivo
                    </span>
                    <span className="text-lg font-mono text-yellow-400 font-bold">
                      Premium
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-[10px] text-foreground-muted uppercase">
                      Alquiler 24 hs
                    </span>

                    {selectedMovie.rentalPrice != null ? (
                      <span className="text-lg font-mono text-accent font-bold">
                        ${selectedMovie.rentalPrice.toLocaleString("es-AR")} ARS
                      </span>
                    ) : (
                      <span className="text-lg font-bold text-emerald-400">
                        Gratis
                      </span>
                    )}
                  </div>
                )}
                </div>
                <div className="border-t border-border mt-6 pt-6 space-y-3">

                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  Reseñas
                </div>

                {access?.allowed ? (
                  <>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Escribe una reseña..."
                      className="w-full min-h-24 rounded-lg bg-background border border-border p-3 text-sm outline-none"
                    />

                    <button
                      onClick={handleReview}
                      className="px-4 py-2 rounded bg-primary text-white text-xs uppercase font-bold"
                    >
                      Publicar reseña
                    </button>
                  </>
                ) : (
                  <div className="rounded-lg border border-border bg-background p-3 text-sm text-foreground-muted">
                    Debes tener acceso al contenido para publicar una reseña.
                  </div>
                )}
                {selectedMovie.reviews.length > 0 && (
                  <div className="space-y-3 pt-4">

                    {selectedMovie.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-border bg-background p-3"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-sm">
                            {review.user}
                          </span>

                          <span className="text-xs text-foreground-muted">
                            {review.createdAt
                            ? new Date (review.createdAt).toLocaleDateString()
                            : "-"}
                          </span>
                        </div>

                        <p className="text-sm text-foreground-muted">
                          {review.comment}
                        </p>
                      </div>
                    ))}

                  </div>
                )}

              </div>
                {/* BUTTON */}
                {access?.allowed ? (
                <button
                  onClick={() => {
                    handlePlayMovie(selectedMovie);
                    setSelectedMovie(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs uppercase font-bold flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  Ver ahora
                </button>
              ) : selectedMovie.contentType === CONTENT.PREMIERE ? (
                <button
                  className="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded text-xs uppercase font-bold"
                >
                  Premium
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
                  <Lock className="w-3.5 h-3.5" />
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