import { AnimatePresence, motion } from "motion/react";
import { Terminal, X } from "lucide-react";

export default function DevConsole({
  isOpen,
  setIsOpen,
  systemLogs,
  setSystemLogs
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="fixed bottom-6 left-6 right-6 lg:w-[480px] bg-black border-2 border-[#2d2d2d] rounded-2xl p-5 z-40 shadow-2xl overflow-hidden text-xs max-h-[460px] flex flex-col justify-between font-mono"
          style={{ borderColor: "#9D0208" }}
        >

          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-[#222] mb-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <Terminal className="text-[#D4AF37] w-4 h-4" />
              <span>Capsula Dev Console</span>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* LOGS */}
          <div className="bg-[#050505] p-3 rounded-lg border border-[#1a1a1a] h-48 overflow-y-auto space-y-1 text-zinc-300">
            {systemLogs.length === 0 ? (
              <span className="text-zinc-600 italic">
                Sin logs...
              </span>
            ) : (
              systemLogs.map((log, i) => (
                <div key={i} className="border-b border-[#111] pb-1">
                  {log}
                </div>
              ))
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-[#1a1a1a] flex justify-between text-[10px] text-[#8E8E8E]">
            <span>Logs: {systemLogs.length}</span>

            <button
              onClick={() => setSystemLogs([])}
              className="text-[#9D0208] hover:underline"
            >
              Limpiar
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}