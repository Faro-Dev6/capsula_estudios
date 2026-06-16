import { Play, Info, Clock, Star } from "lucide-react";

export default function FeaturedMovieSection({
  movies,
  handlePlayMovie,
  setSelectedMovie,
}) {
  const target = movies.find((m) => m.id === "mision-delta");

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row items-stretch bg-[#161616]/60 border border-[#222] rounded-2xl overflow-hidden shadow-2xl relative">

        <div className="absolute top-4 right-4 bg-black/70 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded font-bold">
          Estreno Exclusivo
        </div>

        {/* Poster */}
        {/* quite estos atributos de la linea 20 : h-[340px] lg:h-auto == por ==> min-h-[300px]*/}
        <div className="w-full lg:w-2/5 min-h-[300px] relative">
          <img
            src="https://res.cloudinary.com/dmc9xgwzu/image/upload/c_fill,h_700,f_auto,q_auto/v1781375218/poster_delta_ecplap.png"
            alt="Mision Delta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-80" />
        </div>

        {/* Info */}
        <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between">

          <div>
            <span className="text-xs text-[#9D0208] tracking-widest uppercase font-mono font-bold block mb-2">
              Largometraje Destacado
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Mision Delta
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8E8E8E] mb-6">
              <span className="bg-[#9D0208]/10 text-[#9D0208] border border-[#9D0208]/20 px-2 py-0.5 rounded font-bold font-mono">
                Thriller Psicológico
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 1h 42min
              </span>

              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />{" "}
                4.9 Puntos
              </span>

              <span>2025</span>
            </div>

            <p className="text-sm text-[#8E8E8E] leading-relaxed mb-6">
              En las profundidades de un faro abandonado, un cineasta obsesionado descubre cintas de celuloide que documentan sucesos que aún no han ocurrido.
              Cada proyección consume un pedazo de su propia realidad.
            </p>

            <div className="border-t border-[#222] pt-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8E8E8E] block">Director</span>
                  <span className="text-white font-semibold">Juan Martín</span>
                </div>

                <div>
                  <span className="text-[#8E8E8E] block">Elenco</span>
                  <span className="text-white font-semibold">
                    Ricardo D., Sofía M.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            <button
              onClick={() => {
                if (target) handlePlayMovie(target);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs tracking-wider uppercase font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> Reproducir Película
            </button>

            <button
              onClick={() => {
                if (target) setSelectedMovie(target);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#161616] hover:bg-[#222] text-white border border-[#2d2d2d] text-xs tracking-wider uppercase font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Info className="w-4 h-4" /> Ver Detalles Clave
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}