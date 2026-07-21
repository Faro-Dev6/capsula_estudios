import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CreditCard, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export default function CheckoutSandbox({ onSuccess, onCancel }) {
  const [prefId, setPrefId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPrefId(params.get("pref") || "pref_sandbox_default");
    setTitle(decodeURIComponent(params.get("title") || "Abono Proyección Premium"));
    setPrice(Number(params.get("price") || 3500));
  }, []);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate standard MercadoPago fast banking delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      // Trigger standard API notification webhook in background
      fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "payment.created",
          data: { id: prefId },
          amount: price,
          item_title: title,
          status: "approved"
        })
      }).catch(err => console.error("Webhook notification error:", err));

    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-surface border border-emerald-900/40 rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/10"
        >
          {/* Ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
            <CheckCircle className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-2xl font-sans font-medium mb-2 text-foreground">¡Pago Aprobado!</h2>
          <p className="text-foreground-muted text-sm mb-6">Procesado de forma segura por Mercado Pago Sandbox</p>

          <div className="bg-black/40 border border-border rounded-xl p-5 text-left mb-6 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-border">
              <span className="text-foreground-muted">Concepto:</span>
              <span className="text-white font-medium">{title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border mt-1">
              <span className="text-foreground-muted">Precio:</span>
              <span className="text-accent font-semibold">${price.toLocaleString('es-AR')} ARS</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border mt-1">
              <span className="text-foreground-muted">Transacción ID:</span>
              <span className="text-foreground-muted">{prefId}</span>
            </div>
            <div className="flex justify-between py-1 mt-1">
              <span className="text-foreground-muted">Pasarela:</span>
              <span className="text-emerald-400">MP-SIMULATOR_V1</span>
            </div>
          </div>

          <p className="text-xs text-foreground-muted mb-6">
            El acceso digital ha sido habilitado de inmediato. Imprime o guarda este ticket virtual para ingresos en sala o streaming privado.
          </p>

          <button
            onClick={() => {
              onSuccess(title, price);
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            Volver a la Productora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
      <div className="flex-grow flex items-center justify-center p-4 mt-8">
        <div className="w-full max-w-lg bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
          
          {/* Main payment form column */}
          <div className="w-full p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] uppercase font-mono bg-primary text-white rounded font-bold tracking-widest">CAPSULA ESTUDIOS</span>
                <span className="text-xs text-foreground-muted">Pasarela de Pruebas</span>
              </div>
              <button 
                onClick={onCancel}
                className="text-xs text-foreground-muted hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Cancelar
              </button>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <span className="text-xs text-foreground-muted block mb-1">Total a Pagar</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium text-foreground line-clamp-1">{title}</h3>
                <span className="text-xl font-mono text-accent font-semibold">${price.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-1.5" htmlFor="mp-card-number">
                  Número de Tarjeta (Pruebas)
                </label>
                <div className="relative">
                  <input
                    id="mp-card-number"
                    type="text"
                    required
                    placeholder="4517 8410 9942 2212"
                    pattern="[0-9\s]{13,19}"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                      const matches = value.match(/\d{4,16}/g);
                      const match = (matches && matches[0]) || "";
                      const parts = [];
                      for (let i = 0, len = match.length; i < len; i += 4) {
                        parts.push(match.substring(i, i + 4));
                      }
                      setCardNumber(parts.length > 0 ? parts.join(" ") : value);
                    }}
                    className="w-full bg-background border border-[#333] focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted outline-none transition"
                  />
                  <CreditCard className="w-5 h-5 absolute right-3.5 top-3 text-foreground-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-1.5" htmlFor="mp-card-name">
                  Nombre Impreso en Tarjeta
                </label>
                <input
                  id="mp-card-name"
                  type="text"
                  required
                  placeholder="JUAN PEREZ"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="w-full bg-background border border-[#333] focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-foregorund-muted outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground-muted mb-1.5" htmlFor="mp-expiry">
                    Vencimiento (MM/AA)
                  </label>
                  <input
                    id="mp-expiry"
                    type="text"
                    required
                    placeholder="12/29"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\//g, "").replace(/[^0-9]/g, "");
                      if (val.length > 2) {
                        val = val.substring(0, 2) + "/" + val.substring(2, 4);
                      }
                      setExpiry(val);
                    }}
                    className="w-full bg-background border border-[#333] focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted outline-none transition text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground-muted mb-1.5" htmlFor="mp-cvv">
                    CVV
                  </label>
                  <input
                    id="mp-cvv"
                    type="password"
                    required
                    placeholder="•••"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full bg-background border border-[#333] focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-foreground-muted outline-none transition text-center font-mono tracking-widest"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-1.5" htmlFor="mp-installments">
                  Cuotas sin interés
                </label>
                <select
                  id="mp-installments"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                  className="w-full bg-background border border-border-strong focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition cursor-pointer"
                >
                  <option value="1">1 pago de ${(price).toLocaleString('es-AR')} (Sin interés)</option>
                  <option value="3">3 pagos de ${(price / 3).toFixed(2)} (Sin interés)</option>
                  <option value="6">6 pagos de ${(price / 6).toFixed(2)} (Sin interés)</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-primary hover:bg-primary-hover active:scale-98 text-white rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-border/30 border-t-white rounded-full animate-spin" />
                      <span>Verificando saldo...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pagar con Tarjeta</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-foreground-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transacción cifrada con cifrado SSL SSL/TLS.</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}