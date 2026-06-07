import React from "react";

export default function AboutSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <span className="text-xs text-[#9D0208] uppercase tracking-[0.3em] font-mono block mb-2">
          Compañía Productora
        </span>
        <h2 className="text-3xl sm:text-4xl text-white font-extrabold">
          Detrás de las Proyecciones
        </h2>
        <div className="w-16 h-[2.5px] bg-[#9D0208] mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Filosofía Experimental Premium
          </h3>
          <p className="text-sm text-[#8E8E8E] leading-relaxed mb-6">
            Nuestra productora cinematográfica nació bajo la premisa indiscutible
            de retornar la intriga artística al cine contemporáneo. Buscamos huir
            de la velocidad vacía corporativa, priorizando narrativas de alto
            impacto emocional con fotógrafos especializados e iluminadores de
            talla mundial.
          </p>
          <blockquote className="border-l-2 border-[#9D0208] pl-4 italic text-sm text-[#D4AF37] mb-6 font-serif">
            “El cine de autor no busca complacer gustos ordinarios; aspira a
            desafiar los miedos más recónditos para reordenar la realidad.”
          </blockquote>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#222] bg-black h-80">
          <img
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
            alt="Grabación en estudio"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
              EQUIPO SIGMA V
            </span>
            <p className="text-xs text-[#8E8E8E]">
              Equipamiento óptico cinematográfico 8K propio.
            </p>
          </div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono text-center">
        Nuestras Credenciales
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#161616]/70 border border-[#222] p-6 rounded-xl text-center">
          <span className="text-[#9D0208] font-bold text-4xl block font-mono mb-2">
            15+
          </span>
          <span className="text-xs text-[#F5F5F5] block font-bold mb-1">
            Premios Internacionales
          </span>
          <span className="text-xs text-[#8E8E8E]">
            Festivales de Mar de Plata, Cannes e Indie-Shorts.
          </span>
        </div>

        <div className="bg-[#161616]/70 border border-[#222] p-6 rounded-xl text-center">
          <span className="text-[#D4AF37] font-bold text-4xl block font-mono mb-2">
            12M
          </span>
          <span className="text-xs text-[#F5F5F5] block font-bold mb-1">
            Minutos Reproducidos
          </span>
          <span className="text-xs text-[#8E8E8E]">
            Proyecciones digitales y salas independientes asociadas.
          </span>
        </div>

        <div className="bg-[#161616]/70 border border-[#222] p-6 rounded-xl text-center">
          <span className="text-[#9D0208] font-bold text-4xl block font-mono mb-2">
            100%
          </span>
          <span className="text-xs text-[#F5F5F5] block font-bold mb-1">
            Cine de Autor Ley
          </span>
          <span className="text-xs text-[#8E8E8E]">
            Guiones completamente originales y libres de reescrituras algorítmicas.
          </span>
        </div>
      </div>
    </section>
  );
}