import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Github,
  Send,
  Check,
} from "lucide-react";

export default function ContactSection({
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  handleContactSubmit,
  contactSent,
}) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <span className="text-xs text-[#9D0208] uppercase tracking-[0.3em] font-mono block mb-2">
          Conexión Directa
        </span>
        <h2 className="text-3xl sm:text-4xl text-white font-extrabold">
          Canal de Contacto
        </h2>
        <p className="text-xs text-[#8E8E8E] mt-2 mb-3">
          Envíanos tu propuesta de coproducción o consulta sobre merchandising.
        </p>
        <div className="w-16 h-[2px] bg-[#9D0208] mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#161616] border border-[#222] p-6 rounded-xl space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              Oficinas Centrales
            </h3>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#9D0208] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#8E8E8E] block">
                  Ubicación
                </span>
                <span className="text-xs text-white">
                  San Telmo, CABA, Argentina
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#8E8E8E] block">E-mail</span>
                <span className="text-xs text-white">
                  produccion@capsulaestudios.com
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#9D0208] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#8E8E8E] block">
                  Teléfono / WhatsApp
                </span>
                <span className="text-xs text-white">+54 11 4872-9901</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="p-3 bg-[#161616] border border-[#222] rounded-full text-white hover:text-[#9D0208] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-3 bg-[#161616] border border-[#222] rounded-full text-white hover:text-[#D4AF37] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7">
          <div className="bg-[#161616] border border-[#222] p-6 sm:p-8 rounded-2xl relative">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Emilia Rodríguez"
                  className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-3 text-xs outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="emilia@example.com"
                  className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-3 text-xs outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">
                  Mensaje o Propuesta
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Buenas tardes, me gustaría proponer la exhibición de su corto en..."
                  className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-3 text-xs outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={contactSent}
                className="w-full py-3 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {contactSent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    ¡Enviado Exitosamente!
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}