import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, Play, Volume2, ShoppingCart, Lock, Unlock, ArrowRight, Check, Sparkles, 
  Trash2, Send, Mail, MapPin, Phone, Instagram, Github, Info, Clock, 
  Star, Plus, Minus, X, AlertTriangle, CheckCircle, Terminal, Compass, MessageSquare
} from "lucide-react";

import Navbar, { RocketLogo } from "./components/Navbar";
import Hero from "./components/Hero";
import CheckoutSandbox from "./components/CheckoutSandbox";

export default function App() {
  // Navigation & Filtering States
  const [currentTab, setCurrentTab] = useState("inicio");
  const [movieFilter, setMovieFilter] = useState("todos");
  
  // Data States
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [unlockedMovies, setUnlockedMovies] = useState([]);
  
  // Cart States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Modals & Detail States
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [vimeoDetails, setVimeoDetails] = useState(null);
  const [vimeoLoading, setVimeoLoading] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  
  // Active Interactive Sandbox Payment Flow
  const [activeSandboxUrl, setActiveSandboxUrl] = useState(null);
  const [sandboxItemTitle, setSandboxItemTitle] = useState("");
  const [sandboxPrice, setSandboxPrice] = useState(0);

  // User Authentication State (Simulated + LocalStorage)
  const [userEmail, setUserEmail] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Direct Submission States (Reviews, Contacts)
  const [reviewName, setReviewName] = useState("");
  const [reviewMovie, setReviewMovie] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);

  // System API Logger Console (Developers panel)
  const [isDevConsoleOpen, setIsDevConsoleOpen] = useState(false);
  const [systemLogs, setSystemLogs] = useState([]);
  const [backendTransactions, setBackendTransactions] = useState([]);

  // Merchandising Default List (Aligned with server)
  const merchItems = [
    { id: "remera-sombras", name: "Remera 'Cine de Sombras'", price: 15600, category: "indumentaria", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800", description: "Algodón peinado premium, estampa cinemática en serigrafía." },
    { id: "poster-eco", name: "Poster Oficial Eco de las Sombras", price: 6200, category: "posters", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800", description: "Tamaño A2 en papel ilustración de 250g con terminación mate." },
    { id: "totebag-director", name: "Tote Bag Director's Edition", price: 8500, category: "accesorios", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800", description: "Lienzo super reforzado con bolsillo interno para ópticas o libretas." },
    { id: "membresia-anual", name: "Pase Premium Anual (Abono)", price: 42000, category: "membresias", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800", description: "Acceso ilimitado a películas y estrenos exclusivos online por 12 meses." }
  ];

  // Load Data on Initial Render
  useEffect(() => {
    fetchMoviesAndReviews();
    fetchAdminTransactions();

    // Load active session and unlocked items
    const savedUser = localStorage.getItem("capsulastudios_user");
    if (savedUser) {
      setUserEmail(savedUser);
      addLog(`Sesión de usuario restaurada: ${savedUser}`);
    }

    const savedUnlocked = localStorage.getItem("capsulastudios_unlocked");
    if (savedUnlocked) {
      try {
        setUnlockedMovies(JSON.parse(savedUnlocked));
      } catch (e) {
        // Fallback
      }
    }

    // Capture payment status params from fallback back_urls
    const params = new URLSearchParams(window.location.search);
    const successItem = params.get("item");
    if (successItem) {
      addLog(`Retorno de Mercado Pago detectado. Compra aprobada: ${successItem}`);
      const matchedMovie = movies.find(m => m.title === successItem);
      if (matchedMovie) {
        unlockMovieLocal(matchedMovie.id);
      }
    }
  }, []);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setSystemLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 49)]);
  };

  const fetchMoviesAndReviews = async () => {
    try {
      addLog("Llamando a la API local /api/movies...");
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data.movies || []);
      setReviews(data.reviews || []);
      addLog(`Películas (${data.movies?.length || 0}) y Reseñas (${data.reviews?.length || 0}) cargadas exitosamente.`);
    } catch (err) {
      addLog(`Error al conectar con el servidor backend: ${err.message}`);
    }
  };

  const fetchAdminTransactions = async () => {
    try {
      const res = await fetch("/api/admin/transactions");
      const data = await res.json();
      setBackendTransactions(data.transactions || []);
    } catch (err) {
      // Slid silently
    }
  };

  const handleFetchVimeo = async (vimeoId) => {
    setVimeoLoading(true);
    setVimeoDetails(null);
    addLog(`Proxying Vimeo API request para Video ID: ${vimeoId}...`);
    try {
      const res = await fetch(`/api/vimeo/${vimeoId}`);
      const data = await res.json();
      setVimeoDetails(data);
      addLog(`Respuesta Vimeo recabada: Configurado=${data.vimeoConfigured ? "SÍ" : "NO (Simulado)"}`);
    } catch (err) {
      addLog(`Error solicitando Vimeo API proxy: ${err.message}`);
    } finally {
      setVimeoLoading(false);
    }
  };

  // Checkout Handler via MercadoPago
  const triggerCheckout = async (title, price, isMerch = false, itemId = "") => {
    addLog(`Iniciando preferencia de Mercado Pago de $${price} ARS para "${title}"...`);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, isMerch, itemId })
      });

      const data = await response.json();
      addLog(`Preferencia creada. ID: ${data.id || "N/A"}. Envío directo a init_point.`);

      if (data.init_point) {
        if (data.init_point.startsWith("/checkout-sandbox")) {
          // Mount Sandbox Modal locally to maintain premium frame UX flow!
          setSandboxItemTitle(title);
          setSandboxPrice(price);
          setActiveSandboxUrl(data.init_point);
          addLog("Iniciando pasarela interactiva Mercado Pago Sandbox de prueba.");
        } else {
          addLog(`Redireccionando a Mercado Pago real: ${data.init_point}`);
          window.open(data.init_point, "_blank");
        }
      }
    } catch (err) {
      addLog(`Error de pago en backend /api/checkout: ${err.message}`);
    }
  };

  const unlockMovieLocal = (movieId) => {
    const updated = [...unlockedMovies, movieId];
    setUnlockedMovies(updated);
    localStorage.setItem("capsulastudios_unlocked", JSON.stringify(updated));
    addLog(`Película desbloqueada con éxito para streaming: ${movieId}`);
  };

  const handleSandboxSuccess = (itemTitle, price) => {
    addLog(`Pago aprobado en Sandbox de pruebas: "${itemTitle}" por $${price}`);
    
    // Check if itemTitle belongs to a movie
    const targetMovie = movies.find(m => m.title === itemTitle);
    if (targetMovie) {
      unlockMovieLocal(targetMovie.id);
    } else {
      addLog(`Acceso comprado para item: ${itemTitle}. ¡Colección de compras extendida!`);
    }

    setActiveSandboxUrl(null);
    fetchAdminTransactions();
  };

  // Cart Functions
  const addToCart = (item) => {
    const existingIndex = cart.findIndex(c => c.item.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
    
    addLog(`Item añadido al carrito: ${item.name}`);
    
    // Auto-open for fast user confirmation
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, delta) => {
    const updated = cart.map(c => {
      if (c.item.id === id) {
        const newQ = c.quantity + delta;
        return { ...c, quantity: newQ > 0 ? newQ : 1 };
      }
      return c;
    });
    setCart(updated);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.item.id !== id));
    addLog(`Item removido del carrito: ${id}`);
  };

  const clearCart = () => {
    setCart([]);
    addLog("Carrito de compras vaciado con éxito.");
  };

  const handleCheckoutCart = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
    const descStr = cart.map(c => `${c.item.name} x${c.quantity}`).join(", ");
    
    setIsCartOpen(false);
    triggerCheckout(`Merchandising: ${descStr.substring(0, 40)}...`, total, true, "merch-cart");
  };

  // Submission Management
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewMovie || !reviewComment) return;

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie: reviewMovie,
          user: reviewName,
          rating: reviewRating,
          comment: reviewComment
        })
      });

      if (res.ok) {
        setReviewSubmitted(true);
        addLog(`Nueva reseña enviada para "${reviewMovie}" de ${reviewName}`);
        fetchMoviesAndReviews();
        
        // Clear form
        setTimeout(() => {
          setReviewSubmitted(false);
          setReviewName("");
          setReviewComment("");
        }, 3000);
      }
    } catch (err) {
      addLog("Fallo al conectarse de manera persistente al endpoint de reseñas.");
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setContactSent(true);
    addLog(`Contacto enviado: ${contactName} (${contactEmail}) - ${contactMessage.substring(0, 30)}...`);
    
    setTimeout(() => {
      setContactSent(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4000);
  };

  // Simulated Login/Supabase Integration
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.includes("@")) {
      setLoginError("Por favor ingrese un correo válido.");
      return;
    }
    if (loginPassword.length < 4) {
      setLoginError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    setLoginError("");
    setLoginSuccess(true);
    localStorage.setItem("capsulastudios_user", loginEmail);
    setUserEmail(loginEmail);
    addLog(`Sesión iniciada con éxito para el usuario: ${loginEmail}`);

    setTimeout(() => {
      setLoginSuccess(false);
      setLoginEmail("");
      setLoginPassword("");
      setCurrentTab("inicio");
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("capsulastudios_user");
    setUserEmail(null);
    addLog("Sesión de usuario cerrada.");
  };

  // Active Movie Player trigger
  const handlePlayMovie = (movie) => {
    const isUnlocked = unlockedMovies.includes(movie.id) || movie.price === 0;
    if (!isUnlocked) {
      addLog(`Intento de reproducir película restringida: ${movie.title}. Se requiere pase.`);
      setSelectedMovie(movie); // Open detailed view to prompt checkout
      return;
    }

    setActiveVideo({
      url: movie.videoUrl,
      title: movie.title,
      id: movie.id
    });
    
    if (movie.vimeoId) {
      handleFetchVimeo(movie.vimeoId);
    }
    addLog(`Iniciando reproducción del video: ${movie.title}`);
  };

  // Calculated totals
  const cartTotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative ${cinemaMode ? "overflow-hidden" : ""}`}>
      
      {/* 1. Header Global Navigation Widget */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cart.reduce((acu, c) => acu + c.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        userEmail={userEmail}
        onLogout={handleLogout}
        onOpenDevConsole={() => setIsDevConsoleOpen(!isDevConsoleOpen)}
        moviesTypeFilter={(type) => {
          setMovieFilter(type);
          setCurrentTab("producciones");
        }}
      />

      {/* Main Core Router Switch */}
      <main className="pt-20">
        
        {/* TAB: INICIO */}
        {currentTab === "inicio" && (
          <div>
            <Hero onExplore={(type) => {
              setMovieFilter(type || "todos");
              setCurrentTab("producciones");
            }} />

            {/* Content Cards Section */}
            <section className="w-full flex flex-col md:flex-row gap-[1px] bg-white/10 select-none">
              
              {/* Card 1: Películas */}
              <div 
                onClick={() => {
                  setMovieFilter("pelicula");
                  setCurrentTab("producciones");
                  addLog("Redireccionado a Películas desde Cartas Destacadas.");
                }}
                className="flex-1 min-h-[280px] relative group overflow-hidden bg-[#161616] cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=600')` }}
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="w-10 h-[1px] bg-[#9D0208] mb-3"></div>
                  <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">Películas</h2>
                  <p className="text-xs text-[#8E8E8E] uppercase tracking-widest mt-1 italic">LARGOMETRAJES PREMIADOS</p>
                </div>
              </div>

              {/* Card 2: Cortometrajes */}
              <div 
                onClick={() => {
                  setMovieFilter("corto");
                  setCurrentTab("producciones");
                  addLog("Redireccionado a Cortometrajes desde Cartas Destacadas.");
                }}
                className="flex-1 min-h-[280px] relative group overflow-hidden bg-[#161616] cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=600')` }}
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="w-10 h-[1px] bg-[#9D0208] mb-3"></div>
                  <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">Cortos</h2>
                  <p className="text-xs text-[#8E8E8E] uppercase tracking-widest mt-1 italic">NARRATIVAS COMPACTAS</p>
                </div>
              </div>

              {/* Card 3: Merch */}
              <div 
                onClick={() => {
                  setCurrentTab("merch");
                }}
                className="flex-1 min-h-[280px] relative group overflow-hidden bg-[#161616] cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600')` }}
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="w-10 h-[1px] bg-[#9D0208] mb-3"></div>
                  <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">Merch</h2>
                  <p className="text-xs text-[#8E8E8E] uppercase tracking-widest mt-1 italic">COLECCIÓN LIMITADA</p>
                </div>
              </div>
            </section>

            {/* Featured Selection Highlight Block */}
            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex flex-col lg:flex-row bg-[#161616]/60 border border-[#222] rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-4 right-4 bg-black/70 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded font-bold">
                  Súper Estreno Exclusivo
                </div>
                
                {/* Poster column */}
                <div className="w-full lg:w-2/5 h-[340px] lg:h-auto relative">
                  <img 
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800" 
                    alt="El Eco de las Sombras" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-80" />
                </div>

                {/* Info and action column */}
                <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[#9D0208] tracking-widest uppercase font-mono font-bold block mb-2">Largometraje Destacado</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">El Eco de las Sombras</h2>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#8E8E8E] mb-6">
                      <span className="bg-[#9D0208]/10 text-[#9D0208] border border-[#9D0208]/20 px-2 py-0.5 rounded font-bold font-mono">Thriller Psicológico</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 1h 42min</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" /> 4.9 Puntos</span>
                      <span>2025</span>
                    </div>

                    <p className="text-sm text-[#8E8E8E] leading-relaxed mb-6">
                      En las profundidades de un faro abandonado, un cineasta obsesionado descubre cintas de celuloide que documentan sucesos que aún no han ocurrido. Cada proyección consume un pedazo de su propia realidad.
                    </p>

                    <div className="border-t border-[#222] pt-6 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[#8E8E8E] block">Director</span>
                          <span className="text-white font-semibold">Juan Martín</span>
                        </div>
                        <div>
                          <span className="text-[#8E8E8E] block">Elenco</span>
                          <span className="text-white font-semibold">Ricardo D., Sofía M.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => {
                        const target = movies.find(m => m.id === "eco-sombras");
                        if (target) {
                          handlePlayMovie(target);
                        }
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs tracking-wider uppercase font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" /> Reproducir Película
                    </button>

                    <button
                      onClick={() => {
                        const target = movies.find(m => m.id === "eco-sombras");
                        if (target) {
                          setSelectedMovie(target);
                        }
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-[#161616] hover:bg-[#222] text-white border border-[#2d2d2d] text-xs tracking-wider uppercase font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Info className="w-4 h-4" /> Ver Detalles Clave
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials and Community Reviews */}
            <section className="bg-black py-20 px-6 border-y border-[#161616]">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-mono block mb-2">La Tribuna Crítica</span>
                  <h2 className="text-3xl sm:text-4xl text-white font-extrabold pb-4">Reseñas de la Comunidad</h2>
                  <div className="w-16 h-[2px] bg-[#9D0208] mx-auto mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {reviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="bg-[#161616]/40 border border-[#222] hover:border-[#9D0208]/40 transition-all p-6 rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        {/* Rating representation */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#333]"
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm italic text-[#8E8E8E] mb-6 leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#222]/50 pt-4 mt-auto">
                        <span className="text-xs text-white font-medium">{rev.user}</span>
                        <span className="text-[10px] text-[#8E8E8E] font-mono uppercase tracking-widest">{rev.movie}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submitting Review form box */}
                <div className="max-w-xl mx-auto bg-[#161616] border border-[#252525] rounded-2xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Deja tu Crítica Profesional
                  </h3>
                  <p className="text-xs text-[#8E8E8E] mb-6">Tu valoración aporta enormemente a la difusión del cine de autor independiente.</p>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Nombre o Seudónimo</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Cinefilo_2026"
                          className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-2.5 text-xs outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Obra Audiovisual</label>
                        <select
                          value={reviewMovie}
                          onChange={(e) => setReviewMovie(e.target.value)}
                          required
                          className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] rounded-lg p-2.5 text-xs outline-none transition cursor-pointer"
                        >
                          <option value="">Selecciona una producción...</option>
                          {movies.map(m => (
                            <option key={m.id} value={m.title}>{m.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Valoración (Estrellas)</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setReviewRating(num)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                num <= reviewRating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#333]"
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Tu crítica</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="El montaje me pareció soberbio, y el uso dramático de la fotografía..."
                        className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-2.5 text-xs outline-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={reviewSubmitted}
                      className="w-full py-2.5 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {reviewSubmitted ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" /> ¡Enviado Exitosamente!
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Publicar Comentario
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: PRODUCCIONES */}
        {currentTab === "producciones" && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-[#222] pb-6 mb-12">
              <div>
                <span className="text-xs text-[#9D0208] uppercase tracking-[0.25em] font-mono block mb-1">Catálogo Exclusivo</span>
                <h2 className="text-3xl sm:text-4xl text-white font-extrabold">Nuestras Producciones</h2>
              </div>
              
              <div className="flex items-center gap-2 bg-[#161616] p-1.5 rounded-xl border border-[#212121]">
                {["todos", "pelicula", "corto"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setMovieFilter(t)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      movieFilter === t
                        ? "bg-[#9D0208] text-white"
                        : "text-[#8E8E8E] hover:text-[#F5F5F5]"
                    }`}
                  >
                    {t === "todos" ? "Todos" : t === "pelicula" ? "Películas" : "Cortometrajes"}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered Movie Catalogue list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies
                .filter(m => movieFilter === "todos" || m.type === movieFilter)
                .map((movie) => {
                  const isUnlocked = unlockedMovies.includes(movie.id) || movie.price === 0;
                  return (
                    <motion.div
                      layout
                      key={movie.id}
                      className="bg-[#161616] border border-[#222] hover:border-[#9D0208]/40 rounded-xl overflow-hidden shadow-xl hover:translate-y-[-4px] transition-all duration-300 group flex flex-col justify-between"
                    >
                      {/* Poster Image Container */}
                      <div className="relative h-72 sm:h-80 overflow-hidden bg-black">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        {/* Lock / Unlock Overlay Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          {isUnlocked ? (
                            <span className="px-2.5 py-1 bg-emerald-600/90 text-white rounded text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1 z-10 shadow">
                              <Unlock className="w-3 h-3" /> Acceso Libre
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-[#9D0208]/90 text-white rounded text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1 z-10 shadow">
                              <Lock className="w-3 h-3 text-[#D4AF37]" /> Alquiler Digital
                            </span>
                          )}
                        </div>

                        {/* Hover Quick Action Play */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 z-10">
                          {isUnlocked ? (
                            <button
                              onClick={() => handlePlayMovie(movie)}
                              className="p-4 bg-[#9D0208] hover:bg-[#b0030a] rounded-full text-white transform scale-90 group-hover:scale-100 transition-all cursor-pointer"
                            >
                              <Play className="w-6 h-6 fill-white" />
                            </button>
                          ) : (
                            <div className="flex flex-col gap-2 items-center px-4 text-center">
                              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Un solo pago de</span>
                              <span className="text-xl text-white font-mono font-bold">${movie.price.toLocaleString('es-AR')} ARS</span>
                              <button
                                onClick={() => triggerCheckout(movie.title, movie.price, false, movie.id)}
                                className="px-4 py-2 mt-2 bg-white text-black hover:bg-[#D4AF37] hover:text-black rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Obtener Acceso
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Movie Information metadata */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-mono font-bold">
                              {movie.type === "pelicula" ? "Largometraje" : "Cortometraje"}
                            </span>
                            <span className="text-[10px] text-[#8E8E8E] font-semibold">{movie.duration}</span>
                          </div>
                          <h3 className="text-base font-bold text-white line-clamp-1 mb-2">{movie.title}</h3>
                          <p className="text-xs text-[#8E8E8E] line-clamp-2 leading-relaxed mb-4">{movie.synopsis}</p>
                        </div>

                        {/* Buy / Play Button below */}
                        <div className="border-t border-[#222] pt-4 mt-auto flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedMovie(movie)}
                            className="text-xs text-[#8E8E8E] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                          >
                            <Info className="w-3.5 h-3.5" /> Ficha Técnica
                          </button>

                          {isUnlocked ? (
                            <button
                              onClick={() => handlePlayMovie(movie)}
                              className="px-3.5 py-1.5 bg-emerald-700/85 hover:bg-emerald-600 text-white rounded text-xs transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-white" /> Reproducir
                            </button>
                          ) : (
                            <button
                              onClick={() => triggerCheckout(movie.title, movie.price, false, movie.id)}
                              className="px-3.5 py-1.5 bg-[#9D0208] hover:bg-[#b0030a] text-white rounded text-xs transition-colors flex items-center gap-1 font-semibold cursor-pointer shadow-md"
                            >
                              <Lock className="w-3 h-3 text-[#D4AF37]" /> Rentar
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </section>
        )}

        {/* TAB: BLOG */}
        {currentTab === "blog" && (
          <section className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
              <span className="text-xs text-[#9D0208] uppercase tracking-[0.3em] font-mono block mb-2">Cuadernos de Rodaje</span>
              <h2 className="text-3xl sm:text-4xl text-white font-extrabold">Cine Blog Directores</h2>
              <div className="w-16 h-[2.5px] bg-[#9D0208] mx-auto mt-3" />
            </div>

            <div className="space-y-12">
              {/* Blog Post 1 */}
              <article className="bg-[#161616]/70 border border-[#222] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:border-[#D4AF37]/35 transition-all">
                <div className="w-full md:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
                    alt="Espacio oscuro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-bold block mb-2">Artículos • Iluminación</span>
                    <h3 className="text-xl font-bold text-white mb-3">La Estética del Cine de Terror Moderno y el Estigma Neon Noir</h3>
                    <p className="text-xs text-[#8E8E8E] leading-relaxed mb-4">
                      ¿Cómo influye la paleta de colores sobre el inconsciente cerebral de nuestro público? En este ensayo técnico, desglosamos el uso del rojo escarlata y el contraste de penumbra profunda, tal como lo empleamos en nuestra próxima gran obra, \"El Eco de las Sombras\", inspirándonos en estéticas legendarias de thriller oscuro.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#8E8E8E] border-t border-[#222]/50 pt-4">
                    <span>Por Juan Martín (Director)</span>
                    <span>25 Mayo, 2026</span>
                  </div>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-[#161616]/70 border border-[#222] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:border-[#D4AF37]/35 transition-all">
                <div className="w-full md:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
                    alt="Fotografía patagónica"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-bold block mb-2">Producción • Locaciones</span>
                    <h3 className="text-xl font-bold text-white mb-3">El Desafío Intangible de Grabar Sonido Natural en la Estepa de la Patagonia</h3>
                    <p className="text-xs text-[#8E8E8E] leading-relaxed mb-4">
                      Viajar al extremo sur para filmar \"Los Susurros del Viento\" requirió equipamientos de audio nunca antes testeados en vientos de 90 km/h. Lucía Soler describe la travesía técnica necesaria para filtrar el silbido natural y usarlo como una flauta dramática ambiental.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#8E8E8E] border-t border-[#222]/50 pt-4">
                    <span>Por Lucía Soler (Productores)</span>
                    <span>18 Mayo, 2026</span>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* TAB: MERCH */}
        {currentTab === "merch" && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
              <span className="text-xs text-[#9D0208] uppercase tracking-[0.3em] font-mono block mb-2">Exclusiva Boutique</span>
              <h2 className="text-3xl sm:text-4xl text-white font-extrabold font-sans">Colección de Cineastas</h2>
              <div className="w-16 h-[2px] bg-[#9D0208] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {merchItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#161616] border border-[#222] rounded-xl overflow-hidden hover:border-[#9D0208]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 border border-[#333] px-2.5 py-1 rounded text-[11px] font-mono text-[#D4AF37] font-semibold">
                      ${item.price.toLocaleString('es-AR')}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-mono text-[#8E8E8E] block mb-2">{item.category}</span>
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-[#8E8E8E] leading-relaxed line-clamp-2 mb-4">{item.description}</p>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-2 bg-[#101010] hover:bg-[#9D0208] text-[#F5F5F5] hover:text-white border border-[#2d2d2d] hover:border-transparent text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: NOSOTROS */}
        {currentTab === "nosotros" && (
          <section className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
              <span className="text-xs text-[#9D0208] uppercase tracking-[0.3em] font-mono block mb-2">Compañía Productora</span>
              <h2 className="text-3xl sm:text-4xl text-white font-extrabold">Detrás de las Proyecciones</h2>
              <div className="w-16 h-[2.5px] bg-[#9D0208] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Filosofía Experimental Premium</h3>
                <p className="text-sm text-[#8E8E8E] leading-relaxed mb-6">
                  Nuestra productora cinematográfica nació bajo la premisa indiscutible de retornar la intriga artística al cine contemporáneo. Buscamos huir de la velocidad vacía corporativa, priorizando narrativas de alto impacto emocional con fotógrafos especializados e iluminadores de talla mundial.
                </p>
                <blockquote className="border-l-2 border-[#9D0208] pl-4 italic text-sm text-[#D4AF37] mb-6 font-serif">
                  \"El cine de autor no busca complacer gustos ordinarios; aspira a desafiar los miedos más recónditos para reordenar la realidad.\"
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
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">EQUIPO SIGMA V</span>
                  <p className="text-xs text-[#8E8E8E]">Equipamiento óptico cinematográfico 8K propio.</p>
                </div>
              </div>
            </div>

            {/* Bento details */}
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono text-center">Nuestras Credenciales</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#161616]/70 border border-[#222] p-6 rounded-xl text-center">
                <span className="text-[#9D0208] font-bold text-4xl block font-mono mb-2">15+</span>
                <span className="text-xs text-[#F5F5F5] block font-bold mb-1">Premios Internacionales</span>
                <span className="text-xs text-[#8E8E8E]">Festivales de Mar de Plata, Cannes e Indie-Shorts.</span>
              </div>
              <div className="bg-[#161616]/70 border border-[#222] p-6 rounded-xl text-center">
                <span className="text-[#D4AF37] font-bold text-4xl block font-mono mb-2">12M</span>
                <span className="text-xs text-[#F5F5F5] block font-bold mb-1">Minutos Reproducidos</span>
                <span className="text-xs text-[#8E8E8E]">Proyecciones digitales y salas independientes asociadas.</span>
              </div>
              <div className="bg-[#161616]/70 border border-[#222] p-6 rounded-xl text-center">
                <span className="text-[#9D0208] font-bold text-4xl block font-mono mb-2">100%</span>
                <span className="text-xs text-[#F5F5F5] block font-bold mb-1">Cine de Autor Ley</span>
                <span className="text-xs text-[#8E8E8E]">Guiones completamente originales y libres de reescrituras algorítmicas.</span>
              </div>
            </div>
          </section>
        )}

        {/* TAB: CONTACTO */}
        {currentTab === "contacto" && (
          <section className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
              <span className="text-xs text-[#9D0208] uppercase tracking-[0.3em] font-mono block mb-2">Conexión Directa</span>
              <h2 className="text-3xl sm:text-4xl text-white font-extrabold">Canal de Contacto</h2>
              <p className="text-xs text-[#8E8E8E] mt-2 mb-3">Envíanos tu propuesta de coproducción o consulta sobre merchandising.</p>
              <div className="w-16 h-[2px] bg-[#9D0208] mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Info Column */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-[#161616] border border-[#222] p-6 rounded-xl space-y-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">Oficinas Centrales</h3>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#9D0208] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#8E8E8E] block">Ubicación</span>
                      <span className="text-xs text-white">San Telmo, CABA, Argentina</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#8E8E8E] block">E-mail</span>
                      <span className="text-xs text-white">produccion@capsulaestudios.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#9D0208] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#8E8E8E] block">Teléfono / WhatsApp</span>
                      <span className="text-xs text-white">+54 11 4872-9901</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <a href="#" className="p-3 bg-[#161616] border border-[#222] rounded-full text-white hover:text-[#9D0208] transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-3 bg-[#161616] border border-[#222] rounded-full text-white hover:text-[#D4AF37] transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Form Column */}
              <div className="md:col-span-7">
                <div className="bg-[#161616] border border-[#222] p-6 sm:p-8 rounded-2xl relative">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Nombre Completo</label>
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
                      <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Correo Electrónico</label>
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
                      <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Mensaje o Propuesta</label>
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
                          <Check className="w-4 h-4 text-emerald-400" /> ¡Enviado Exitosamente!
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Enviar Mensaje
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: LOGIN */}
        {currentTab === "login" && (
          <section className="max-w-md mx-auto px-6 py-16">
            <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#9D0208]" />
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black uppercase text-white tracking-tight">Acceso Cineasta</h2>
                <p className="text-xs text-[#8E8E8E] mt-1">Ingresa para administrar tus accesos y streaming digital.</p>
              </div>

              {userEmail ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-700/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-white font-medium">Tienes una sesión activa como:</p>
                  <p className="text-xs font-mono text-[#D4AF37] bg-black/50 py-2 px-3 rounded inline-block">{userEmail}</p>
                  
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => setCurrentTab("producciones")}
                      className="w-full py-2.5 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs uppercase font-semibold tracking-widest rounded-lg transition-colors cursor-pointer"
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
                    <div className="p-3 bg-[#9D0208]/15 border border-[#9D0208]/30 rounded text-xs text-[#9D0208] flex items-center gap-2">
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
                    <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="cine@gmail.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-2.5 text-xs outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E8E8E] mb-1 font-mono">Contraseña</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-[#050505] border border-[#2d2d2d] focus:border-[#9D0208] text-[#F5F5F5] placeholder-gray-600 rounded-lg p-2.5 text-xs outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loginSuccess}
                    className="w-full py-2.5 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-colors cursor-pointer"
                  >
                    Ingresar con Seguridad
                  </button>

                  <div className="pt-4 border-t border-[#222]/50 text-center">
                    <span className="text-[10px] text-[#8E8E8E]">¿No tienes credenciales Supabase? Escribe cualquier correo para simular. Acceso temporal libre habilitado para testing.</span>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

      </main>

      {/* 2. Side Sliding Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/75 z-50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-[#161616] border-l border-[#222] text-[#F5F5F5] z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#222] mb-6">
                  <h3 className="text-lg font-bold uppercase tracking-wider font-mono flex items-center gap-2 text-white">
                    <ShoppingCart className="w-5 h-5 text-[#9D0208]" /> Tu Pedido
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 hover:text-[#9D0208] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 pointer-events-none" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 text-[#8E8E8E] space-y-4">
                    <ShoppingCart className="w-12 h-12 mx-auto stroke-[1.2] text-[#333]" />
                    <p className="text-xs">Tu bolsa de compras cinematográficas está vacía actualmente.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentTab("merch");
                      }}
                      className="px-4 py-2 bg-[#9D0208] hover:bg-[#b0030a] text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Explorar la Tienda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {cart.map((c) => (
                      <div key={c.item.id} className="flex gap-4 p-3 bg-black/45 border border-[#2d2d2d] rounded-xl relative">
                        <img 
                          src={c.item.image} 
                          alt={c.item.name} 
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-zinc-900" 
                        />
                        <div className="flex-grow min-w-0 pr-4">
                          <h4 className="text-xs font-bold text-white truncate">{c.item.name}</h4>
                          <span className="text-[11px] text-[#D4AF37] font-mono block mt-1">
                            ${c.item.price.toLocaleString('es-AR')} ARS
                          </span>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(c.item.id, -1)}
                              className="p-1 text-[#8E8E8E] hover:text-white cursor-pointer bg-zinc-900 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono text-white px-1.5">{c.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(c.item.id, 1)}
                              className="p-1 text-[#8E8E8E] hover:text-white cursor-pointer bg-zinc-900 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(c.item.id)}
                          title="Eliminar"
                          className="absolute top-3 right-3 text-zinc-500 hover:text-[#9D0208] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-[#222] pt-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#8E8E8E] uppercase tracking-wider">Subtotal Final:</span>
                    <span className="text-2xl font-mono text-[#D4AF37] font-bold">${cartTotal.toLocaleString('es-AR')} ARS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-[#8E8E8E] mb-2 font-mono">
                    <span>• Impuestos incluidos</span>
                    <span className="text-right">• Retorno seguro</span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleCheckoutCart}
                      className="w-full py-3 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#9D0208]/15"
                    >
                      <span>Comprar por Mercado Pago</span> <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={clearCart}
                      className="w-full py-2 bg-transparent text-[#8E8E8E] hover:text-white border border-[#222] hover:border-zinc-700 rounded-lg text-[10px] uppercase font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Movie Detail / Technical Sheet Modal Dialog */}
      <AnimatePresence>
        {selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              onClick={() => setSelectedMovie(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#161616] border border-white/10 rounded-2xl overflow-hidden relative z-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:text-[#9D0208] transition-all cursor-pointer z-10 border border-[#2d2d2d]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-56 relative">
                <img 
                  src={selectedMovie.backdrop} 
                  alt={selectedMovie.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/70 to-transparent" />
                
                <div className="absolute bottom-4 left-6 flex items-baseline gap-3">
                  <h3 className="text-2xl font-extrabold text-white">{selectedMovie.title}</h3>
                  <span className="text-xs text-[#D4AF37] font-mono font-bold uppercase">[{selectedMovie.rating}]</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E8E8E]">
                  <span className="px-2.5 py-0.5 bg-[#9D0208]/15 text-[#9D0208] font-bold rounded">
                    {selectedMovie.genre}
                  </span>
                  <span>{selectedMovie.year}</span>
                  <span>{selectedMovie.duration}</span>
                  <span>Dirigida por <b>{selectedMovie.director}</b></span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold">Sinopsis Argumental</h4>
                  <p className="text-sm text-[#8E8E8E] leading-relaxed">
                    {selectedMovie.synopsis}
                  </p>
                </div>

                {/* Pricing / Access details */}
                <div className="bg-[#050505] p-4 rounded-xl border border-[#212121] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Disponibilidad Stream</span>
                    {unlockedMovies.includes(selectedMovie.id) || selectedMovie.price === 0 ? (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-1">
                        <Unlock className="w-3.5 h-3.5" /> ¡Ya tienes acceso completo!
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-mono text-[#D4AF37] font-bold">${selectedMovie.price.toLocaleString('es-AR')} ARS</span>
                        <span className="text-[10px] text-[#8E8E8E]">(Pago único de renta digital)</span>
                      </div>
                    )}
                  </div>

                  <div>
                    {unlockedMovies.includes(selectedMovie.id) || selectedMovie.price === 0 ? (
                      <button
                        onClick={() => {
                          const target = selectedMovie;
                          setSelectedMovie(null);
                          handlePlayMovie(target);
                        }}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> Iniciar Reproducción
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const target = selectedMovie;
                          setSelectedMovie(null);
                          triggerCheckout(target.title, target.price, false, target.id);
                        }}
                        className="px-5 py-2.5 bg-[#9D0208] hover:bg-[#b0030a] text-white rounded text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1 cursor-pointer shadow-lg shadow-[#9D0208]/15"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#D4AF37]" /> Alquilar Ahora
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Movie Player with Vimeo proxy support */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-4 sm:p-6 select-none">
            
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-[#111] pb-4 z-10">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#9D0208] animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">{activeVideo.title}</h3>
                  <span className="text-[10px] text-[#8E8E8E]">Reproductor Oficial Capsula Estudios - 1080p Stream</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCinemaMode(!cinemaMode)}
                  className={`px-3 py-1 text-xs border rounded transition-colors cursor-pointer ${
                    cinemaMode ? "bg-[#9D0208] border-transparent text-white" : "border-[#2d2d2d] text-[#8E8E8E] hover:text-white"
                  }`}
                >
                  {cinemaMode ? "Modo Cine: ON" : "Modo Cine"}
                </button>
                <button
                  onClick={() => {
                    setActiveVideo(null);
                    setVimeoDetails(null);
                    setCinemaMode(false);
                    addLog("Reproducción detenida.");
                  }}
                  className="p-2 bg-[#161616] border border-[#222] text-[#F5F5F5] hover:text-[#9D0208] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Cinema Screen */}
            <div className="flex-grow flex items-center justify-center relative py-6">
              {!cinemaMode && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[300px] bg-[#9D0208]/8 rounded-full blur-[140px] pointer-events-none -z-1" />
              )}

              <div className="w-full max-w-4xl aspect-video bg-black rounded-lg border border-[#1a1a1a] shadow-2xl relative overflow-hidden group">
                <video
                  autoPlay
                  controls
                  playsInline
                  src={activeVideo.url}
                  className="w-full h-full object-contain"
                />

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-xs sm:text-sm font-medium tracking-wide text-white/90 drop-shadow-md pointer-events-none">
                  [Viento silbando bajo los andes patagónicos]
                </div>
              </div>
            </div>

            {/* Bottom Vimeo and file metadata panel */}
            <div className="bg-[#101010] border border-[#1a1a1a] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between z-10 font-mono text-xs text-[#8E8E8E]">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="p-2 bg-zinc-900 rounded border border-[#222]">
                  <Compass className="w-4 h-4 text-[#D31018]" />
                </div>
                <div>
                  <span className="text-white block font-sans font-semibold">Integración Vimeo API Proxy</span>
                  {vimeoLoading ? (
                    <span className="text-[10px] animate-pulse">Llamando endpoints de vídeo privados...</span>
                  ) : vimeoDetails ? (
                    <span className="text-[10px] text-emerald-400">
                      Vimeo Video ID: {movies.find(m => m.id === activeVideo.id)?.vimeoId || "76239102"} ({vimeoDetails.vimeoConfigured ? "Conectado" : "Simulado"})
                    </span>
                  ) : (
                    <span className="text-[10px]">No solicitado aún.</span>
                  )}
                </div>
              </div>

              {vimeoDetails && (
                <div className="flex-grow text-center text-[10px] border-t md:border-t-0 md:border-x border-[#1a1a1a] py-2 md:py-0 px-4 max-w-md line-clamp-1">
                  <b>Metadata:</b> {vimeoDetails.title || "Trailer CapsulaEstudios"} · {vimeoDetails.description || "Video de acceso privado"}
                </div>
              )}

              <div className="text-right text-[10px] flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
                <span>STREAM_LIVE_DIRECT_READY</span>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* 5. Integrated Interactive Sandbox Payment overlay */}
      {activeSandboxUrl && (
        <div className="fixed inset-0 z-[100] h-screen w-screen overflow-y-auto bg-black bg-opacity-85">
          <CheckoutSandbox
            onSuccess={handleSandboxSuccess}
            onCancel={() => {
              setActiveSandboxUrl(null);
              addLog("Sandbox de pago cancelado por el usuario.");
            }}
          />
        </div>
      )}

      {/* 6. System Real-time API Logs Console */}
      <AnimatePresence>
        {isDevConsoleOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-[480px] bg-black border-2 border-[#2d2d2d] rounded-2xl p-5 z-40 shadow-2xl overflow-hidden text-xs max-h-[460px] flex flex-col justify-between font-mono"
            style={{ borderColor: "#9D0208" }}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#222] mb-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Terminal className="text-[#D4AF37] w-4 h-4 shrink-0" />
                  <span>Capsula Estudios - Consola de Control de APIs</span>
                </div>
                <button
                  onClick={() => setIsDevConsoleOpen(false)}
                  className="text-zinc-500 hover:text-[#9D0208]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status block info */}
              <div className="grid grid-cols-2 gap-2 bg-[#161616] p-2.5 rounded border border-[#222] mb-3 text-[10px] text-zinc-400">
                <div>
                  <span className="text-[#8E8E8E] block">Estado del Puerto:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> :3000 ACTIVO
                  </span>
                </div>
                <div>
                  <span className="text-[#8E8E8E] block">Pasarela MercadoPago:</span>
                  <span className="text-[#D4AF37] font-semibold">SANDBOX_Fallback_V1</span>
                </div>
              </div>

              {/* Code logs listing */}
              <h4 className="text-[10px] text-[#8E8E8E] uppercase tracking-wider mb-1 font-bold">Logs de Red Internos</h4>
              <div className="bg-[#050505] p-3 rounded-lg border border-[#1a1a1a] h-48 overflow-y-auto text-zinc-300 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
                {systemLogs.length === 0 ? (
                  <span className="text-zinc-600 block italic">Ningún evento registrado aún...</span>
                ) : (
                  systemLogs.map((log, i) => (
                    <div key={i} className="leading-tight break-all border-b border-[#111] pb-1">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a1a1a] flex justify-between items-center text-[10px] text-[#8E8E8E]">
              <span>Registros Guardados: {systemLogs.length}</span>
              <button
                onClick={() => {
                  setSystemLogs([]);
                  addLog("Historial de Consola purgado.");
                }}
                className="text-[#9D0208] hover:underline"
              >
                Limpiar historial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Footer Premium Layout */}
      <footer className="h-auto py-12 px-6 sm:px-12 bg-black border-t border-white/5 font-sans mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2 group cursor-pointer" onClick={() => setCurrentTab("inicio")}>
              <div className="bg-transparent flex items-center justify-center">
                <RocketLogo />
              </div>
              <span className="text-sm font-black tracking-widest uppercase text-white">CAPSULA ESTUDIOS</span>
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium uppercase tracking-wider">
              © 2026 CAPSULA ESTUDIOS · TODOS LOS DERECHOS RESERVADOS
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#161616]/40 border border-white/5 py-2 px-4 rounded-xl">
            <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-500 mr-2">Soporte Seguro:</span>
            <div className="flex gap-3 items-center opacity-70">
              <div className="h-6 w-10 bg-[#161616] border border-white/10 rounded flex items-center justify-center p-0.5 text-[8px] font-sans text-blue-400 font-extrabold tracking-tighter shadow-sm">
                VISA
              </div>
              <div className="h-6 w-10 bg-[#161616] border border-white/10 rounded flex items-center justify-center p-0.5 text-[8px] font-sans text-orange-400 font-extrabold tracking-tighter shadow-sm">
                M/C
              </div>
              <div className="h-6 w-14 bg-[#161616] border border-white/10 rounded flex items-center justify-center p-0.5 text-[7px] font-sans text-[#D4AF37] font-extrabold tracking-widest shadow-sm">
                M/PAGO
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-[#8E8E8E] hover:text-[#D4AF37]">Términos</a>
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-[#8E8E8E] hover:text-[#D4AF37]">Privacidad</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Simple legacy wrapper for MessageSquare
function MessageSquareIcon(props) {
  return <MessageSquare {...props} />;
}
