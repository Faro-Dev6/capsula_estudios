import React from "react";
import {
  CheckCircle,
  AlertTriangle,
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
  handleLogout,
  setCurrentTab,
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
            Ingresa para administrar tus accesos y streaming digital.
          </p>
        </div>

        {userEmail ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>

            <p className="text-sm text-white font-medium">
              Tienes una sesión activa como:
            </p>

            <p className="text-xs font-mono text-accent bg-black/50 py-2 px-3 rounded inline-block">
              {userEmail}
            </p>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => setCurrentTab("producciones")}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs uppercase font-semibold tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Ir al Catálogo
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-black hover:bg-zinc-900 border border-[#333] text-zinc-400 text-xs uppercase font-semibold tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Cerrar Sesión Activa
              </button>
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
                ¿No tienes credenciales Supabase? Escribe cualquier correo para simular.
                Acceso temporal libre habilitado para testing.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}