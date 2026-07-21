import { AnimatePresence, motion } from "motion/react";
import { Terminal, X } from "lucide-react";

export default function DevConsole({
  isOpen,
  setIsOpen,
  systemLogs,
  setSystemLogs,
  movies = [],
  handlePlayMovie,
  unlockMovieLocal,
  setUnlockedMovies,
  activeVideo,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="fixed bottom-6 left-6 right-6 lg:w-[480px] bg-background border-2 border-border-muted rounded-2xl p-5 z-40 shadow-2xl overflow-hidden text-xs max-h-[500px] flex flex-col justify-between font-mono"
          style={{ borderColor: "#9D0208" }}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Terminal className="text-accent w-4 h-4" />
              <span>Capsula Dev Console</span>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* LOGS */}
          <div className="bg-background p-3 rounded-lg border border-border-strong h-48 overflow-y-auto space-y-1 text-foreground">
            {systemLogs.length === 0 ? (
              <span className="text-foreground italic">Sin logs...</span>
            ) : (
              systemLogs.map((log, i) => (
                <div key={i} className="border-b border-border pb-1">
                  {log}
                </div>
              ))
            )}
          </div>

          {/* PLAYER TEST*/}

          <div className="mt-3 border border-border-strong rounded-lg p-3">
            <div className="text-accent mb-2 font-bold">PLAYER TEST</div>

            <div className="flex flex-wrap gap-2">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handlePlayMovie(movie)}
                  className="px-2 py-1 bg-surface rounded border border-border"
                >
                  {movie.title}
                </button>
              ))}
            </div>
          </div>

          {/* ACCES TEST */}

          <div className="mt-3 border border-border-strong rounded-lg p-3">
            <div className="text-accent mb-2 font-bold">ACCESS TEST</div>

            <div className="flex flex-wrap gap-2">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => unlockMovieLocal(movie.id)}
                  className="px-2 py-1 bg-emerald-900 rounded"
                >
                  Unlock {movie.title}
                </button>
              ))}

              <button
                onClick={() => {
                  setUnlockedMovies([]);
                  localStorage.removeItem("capsulastudios_unlocked");
                }}
                className="px-2 py-1 bg-danger text-white rounded"
              >
                Reset Access
              </button>
            </div>
          </div>

          {/* VIMEO DEBUG */}

          <div className="mt-3 border border-border-strong rounded-lg p-3">
            <div className="text-accent mb-2 font-bold">VIMEO DEBUG</div>

            {activeVideo ? (
              <>
                <div>Video: {activeVideo.title}</div>
                <div>ID: {activeVideo.vimeoId}</div>
              </>
            ) : (
              <div>Sin reproducción activa</div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-[#1a1a1a] flex justify-between text-[10px] text-foreground-muted">
            <span>Logs: {systemLogs.length}</span>

            <button
              onClick={() => setSystemLogs([])}
              className="text-primary hover:underline"
            >
              Limpiar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
