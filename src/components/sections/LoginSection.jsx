import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  History,
  Crown,
} from "lucide-react";

export default function LoginSection({
  userEmail,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginError,
  loginSuccess,
  handleLoginSubmit,
  setCurrentTab,
  currentUser,
  movies,
}) {
  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary" />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase text-foreground tracking-tight">
            Acceso Cineasta
          </h2>

          <p className="text-xs text-foreground-muted mt-1">
            Administra tu acceso y streaming digital.
          </p>
        </div>

        {userEmail ? (
          <div className="space-y-6">

            {/* SESIÓN */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-700/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>

              <p className="text-sm text-white font-medium">
                Tienes una sesión activa como:
              </p>

              <p className="text-xs font-mono text-accent bg-black/50 py-2 px-3 rounded inline-block">
                {userEmail}
              </p>
            </div>

            {/* SUSCRIPCIÓN */}
            <div className="bg-background border border-border-muted rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="w-5 h-5 text-accent" />

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-foreground-muted">
                    Suscripción actual
                  </p>

                  <p className="text-sm font-bold text-white">
                    {currentUser?.subscription || "FREE"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs uppercase font-semibold tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Cambiar Suscripción
              </button>
            </div>

            {/* CATÁLOGO */}
            <button
              onClick={() => setCurrentTab("producciones")}
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs uppercase font-semibold tracking-widest rounded-lg transition-colors cursor-pointer"
            >
              Ir al Catálogo
            </button>

            {/* HISTORIAL */}
            <div className="border-t border-border/50 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-accent" />

                <h3 className="text-xs uppercase tracking-widest font-bold text-white">
                  Historial
                </h3>
              </div>

              {currentUser?.history?.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {currentUser.history
                    .slice()
                    .reverse()
                    .map((item, index) => {
                      const movie = movies?.find(
                        (movie) => movie.id === item.movieId
                      );

                      return (
                        <div
                          key={`${item.movieId}-${index}`}
                          className="bg-background border border-border-muted rounded-lg p-3"
                        >
                          <p className="text-xs font-semibold text-white">
                            {movie?.title || `Película ${item.movieId}`}
                          </p>

                          <p className="text-[10px] text-foreground-muted mt-1">
                            {new Date(item.watchedAt).toLocaleDateString(
                              "es-AR"
                            )}
                          </p>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-[10px] text-foreground-muted text-center py-4">
                  Todavía no has visto ninguna película.
                </p>
              )}
            </div>

          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-primary/15 border border-primary/30 rounded text-xs text-primary flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {loginSuccess && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/20 rounded text-xs text-emerald-400">
                ¡Ingreso simulado exitoso! Redireccionando...
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-foreground-muted mb-1 font-mono">
                Email
              </label>

              <input
                type="email"
                required
                placeholder="cine@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-background border border-border-muted focus:border-primary text-foreground placeholder-gray-600 rounded-lg p-2.5 text-xs outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-foreground-muted mb-1 font-mono">
                Contraseña
              </label>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-background border border-border-muted focus:border-primary text-foreground placeholder-gray-600 rounded-lg p-2.5 text-xs outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loginSuccess}
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-colors cursor-pointer"
            >
              Ingresar con Seguridad
            </button>

            <div className="pt-4 border-t border-border/50 text-center">
              <span className="text-[10px] text-foreground-muted">
                Acceso temporal habilitado para testing.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}