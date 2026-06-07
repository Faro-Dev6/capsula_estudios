import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Film, X, Compass } from "lucide-react";

export default function VideoPlayer({
  activeVideo,
  setActiveVideo,
  setCinemaMode,
  cinemaMode,
  vimeoDetails,
  vimeoLoading,
  movies,
  addLog,
}) {
  return (
    <AnimatePresence>
      {activeVideo && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-4 sm:p-6 select-none">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#111] pb-4 z-10">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-[#9D0208]" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  {activeVideo.title}
                </h3>
                <span className="text-[10px] text-[#8E8E8E]">
                  Reproductor Oficial Capsula Estudios
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCinemaMode(!cinemaMode)}
                className={`px-3 py-1 text-xs border rounded ${
                  cinemaMode
                    ? "bg-[#9D0208] text-white border-transparent"
                    : "border-[#2d2d2d] text-[#8E8E8E]"
                }`}
              >
                {cinemaMode ? "Modo Cine ON" : "Modo Cine"}
              </button>

              <button
                onClick={() => {
                  setActiveVideo(null);
                  setCinemaMode(false);
                  addLog("Reproducción detenida.");
                }}
                className="p-2 bg-[#161616] border border-[#222] rounded-full text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PLAYER */}
          <div className="flex-grow flex items-center justify-center relative py-6">

            {!cinemaMode && (
              <div className="absolute w-3/4 h-[300px] bg-[#9D0208]/10 blur-[140px] rounded-full" />
            )}

            <div className="w-full max-w-4xl aspect-video bg-black rounded-lg border border-[#1a1a1a] overflow-hidden">
              <video
                controls
                autoPlay
                src={activeVideo.url}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* FOOTER / METADATA */}
          <div className="bg-[#101010] border border-[#1a1a1a] rounded-xl p-4 text-xs text-[#8E8E8E] flex flex-col md:flex-row justify-between items-center gap-4">

            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-[#D31018]" />
              <div>
                <span className="text-white block">
                  Vimeo API Integration
                </span>

                {vimeoLoading ? (
                  <span className="text-[10px] animate-pulse">
                    Cargando metadata...
                  </span>
                ) : vimeoDetails ? (
                  <span className="text-[10px] text-emerald-400">
                    Video conectado
                  </span>
                ) : (
                  <span className="text-[10px]">
                    Sin metadata
                  </span>
                )}
              </div>
            </div>

            <div className="text-[10px] text-center max-w-md">
              {vimeoDetails?.title || "Streaming activo"}
            </div>

            <div className="text-[10px] flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              STREAM LIVE
            </div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}