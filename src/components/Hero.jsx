import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Volume2, VolumeX, Clapperboard, Film } from "lucide-react";

export default function Hero({ onExplore }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);
  
  const videoSrc = "https://res.cloudinary.com/dmc9xgwzu/video/upload/q_auto,f_auto/v1781578575/MISI%C3%93N_DELTA__TR%C3%81ILER_FINAL_4K_2025_TERROR_-_SUSPENSO_nembw5.mp4";
  // High quality loopable background representing cinematic art
  const posterPlaceholder = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1600";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Definimos la duración total (ajusta esto según tu video real)
      // Supongamos que tu video dura 30 segundos
      const duration = video.duration;
      const pauseThreshold = duration - 0.10; // Umbral cerca del final

      if (video.currentTime >= pauseThreshold && !video.paused) {
        video.pause();
        
        // Pausar por 10 segundos
        setTimeout(() => {
          if (video) {
            video.currentTime = 0; // Reiniciar al inicio
            video.play();
          }
        }, 10000);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-background font-sans">
      
      {/* Background Media - Cinema Projection backdrop */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {isPlaying ? (
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover  scale-102 transition-transform duration-1000"
              src={videoSrc}
            />
            {/* Soft Grain Overlay to maximize the cinematic projector style */}
            <div className="absolute inset-0 bg-background/20 mix-blend-overlay pointer-events-none" />
          </div>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-30 scale-100 transition-all duration-700"
            style={{ backgroundImage: `url(${posterPlaceholder})` }}
          />
        )}
        
        {/* Cinema Anamorphic Aspect Ratio bars (top and bottom black rails) */}
        <div className="absolute top-0 left-0 w-full h-10 bg-background z-10 hidden sm:block" />
        <div className="absolute bottom-0 left-0 w-full h-10 bg-background z-10 hidden sm:block" />

        {/* Master Dark Radial Gradient Overlay targeting premium cinematic focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-1" />
      </div>

      {/* Atmospheric neon spot projection behind the title */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-accent/4 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Hero Elements */}
      {/* ------------------ comentario tenporal -------------------------*/}
      {/*  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
         Animated production clapper badge 
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-bg-surface/90 border border-border-muted rounded-full text-xs text-accent mb-8 shadow-lg shadow-black/80"
        >
          <Clapperboard className="w-3.5 h-3.5 animate-bounce" />
          <span className="font-mono tracking-widest uppercase font-semibold">Cine Independiente • Estreno 2026</span>
        </motion.div>

         Interactive typography using standard framer motion 
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Historias que <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-accent">
            dejan huella
          </span>
        </motion.h1>

        <motion.p 
          className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Productora audiovisual enfocada en la creación de cine independiente de autor,
          cortometrajes inmersivos y exclusivas experiencias cinematográficas latinoamericanas.
        </motion.p>

         Action controls
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => onExplore("todos")}
            className="px-8 py-3.5 bg-primary hover:bg-primary-hover active:scale-98 text-foreground text-sm font-semibold rounded-xl transition-all tracking-wide cursor-pointer flex items-center gap-2 group shadow-xl shadow-primary/20"
          >
            <span>Ver Producciones</span>
            <Play className="w-4 h-4 fill-white text-foreground group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onExplore("corto")}
            className="px-6 py-3.5 bg-surface hover:bg-surface-hover text-foreground hover:text-accent border border-border-muted text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <Film className="w-4 h-4" />
            <span>Ver Cortometrajes</span>
          </button>
        </motion.div>
      </div> */}

      {/* Overlay controls - sound on/off & video playback state indicator */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-3">
        <span className="hidden sm:inline font-mono text-[10px] text-foreground-muted bg-black/55 px-2 py-1 rounded border border-[#1a1a1a]">
          MISION DELTA TRAILER
        </span>
        <button
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? "Activar Sonido" : "Silenciar"}
          className="p-2.5 bg-bg-surface/90 border border-border-muted rounded-full hover:bg-background text-foreground hover:text-accent transition-all cursor-pointer shadow-md"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
