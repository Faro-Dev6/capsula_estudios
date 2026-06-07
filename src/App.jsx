import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Film,
  Play,
  Volume2,
  ShoppingCart,
  Lock,
  Unlock,
  ArrowRight,
  Check,
  Sparkles,
  Trash2,
  Send,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Github,
  Info,
  Clock,
  Star,
  Plus,
  Minus,
  X,
  AlertTriangle,
  CheckCircle,
  Terminal,
  Compass,
  MessageSquare,
} from "lucide-react";

import {
  fetchMoviesAndReviewsApi,
  fetchAdminTransactionsApi,
  fetchVimeoApi,
  createCheckoutApi,
} from "./services/apiService";

import useMovies from "./hooks/useMovies";
import useCart from "./hooks/useCart";
import useAuth from "./hooks/useAuth";
import useDevConsole from "./hooks/useDevConsole";
import useContact from "./hooks/useContact";
import useReviews from "./hooks/useReviews";
import useContent from "./hooks/useContent";

import ProductionsPage from "./pages/ProductionsPage";
import BlogPage from "./pages/BlogPage";
import MerchPage from "./pages/MerchPage";

import HomeCategories from "./components/HomeCategories";
import FeaturedMovieSection from "./components/FeaturedMovieSection";
import ReviewsSection from "./components/reviews/ReviewsSection";
import Navbar, { RocketLogo } from "./components/Navbar";
import Hero from "./components/Hero";
import CheckoutSandbox from "./components/CheckoutSandbox";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import LoginSection from "./components/sections/LoginSection";
import CartDrawer from "./components/cart/CartDrawer";
import MovieModal from "./components/MovieModal";
import VideoPlayer from "./components/VideoPlayer";
import DevConsole from "./components/DevConsole";

export default function App() {
  // ========================
  // STATE
  // ========================
  const [currentTab, setCurrentTab] = useState("inicio");
  const [movieFilter, setMovieFilter] = useState("todos");

  const [activeSandboxUrl, setActiveSandboxUrl] = useState(null);
  const [sandboxItemTitle, setSandboxItemTitle] = useState("");
  const [sandboxPrice, setSandboxPrice] = useState(0);

  // ========================
  // DEV CONSOLE
  // ========================
  const {
    isDevConsoleOpen,
    setIsDevConsoleOpen,
    systemLogs,
    setSystemLogs,
    backendTransactions,
    setBackendTransactions,
    addLog,
    clearLogs,
  } = useDevConsole();

  // ========================
  // CONTENT
  // ========================
  const { movies, reviews, fetchMoviesAndReviews } = useContent({ addLog });

  // ========================
  // MERCH
  // ========================
  const merchItems = [
    {
      id: "remera-sombras",
      name: "Remera 'Cine de Sombras'",
      price: 15600,
      category: "indumentaria",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
      description: "Algodón peinado premium, estampa cinemática en serigrafía.",
    },
    {
      id: "poster-eco",
      name: "Poster Oficial Eco de las Sombras",
      price: 6200,
      category: "posters",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
      description:
        "Tamaño A2 en papel ilustración de 250g con terminación mate.",
    },
    {
      id: "totebag-director",
      name: "Tote Bag Director's Edition",
      price: 8500,
      category: "accesorios",
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      description: "Lienzo super reforzado con bolsillo interno.",
    },
    {
      id: "membresia-anual",
      name: "Pase Premium Anual (Abono)",
      price: 42000,
      category: "membresias",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800",
      description: "Acceso ilimitado por 12 meses.",
    },
  ];

  // ========================
  // CHECKOUT (DEBE IR ANTES DE useCart)
  // ========================
  const triggerCheckout = async (
    title,
    price,
    isMerch = false,
    itemId = "",
  ) => {
    addLog(`Iniciando pago de $${price} para "${title}"`);

    try {
      const data = await createCheckoutApi({
        title,
        price,
        isMerch,
        itemId,
      });

      if (data.init_point) {
        if (data.init_point.startsWith("/checkout-sandbox")) {
          setSandboxItemTitle(title);
          setSandboxPrice(price);
          setActiveSandboxUrl(data.init_point);
        } else {
          window.open(data.init_point, "_blank");
        }
      }
    } catch (err) {
      addLog(`Error checkout: ${err.message}`);
    }
  };

  // ========================
  // ADMIN FETCH (ANTES DE useEffect)
  // ========================
  const fetchAdminTransactions = useCallback(async () => {
    try {
      const data = await fetchAdminTransactionsApi();
      setBackendTransactions(data.transactions || []);
    } catch (err) {}
  }, [setBackendTransactions]);

  // ========================
  // HOOKS QUE DEPENDEN DE LAS FUNCIONES
  // ========================
  const {
    selectedMovie,
    setSelectedMovie,
    activeVideo,
    setActiveVideo,
    vimeoDetails,
    vimeoLoading,
    cinemaMode,
    setCinemaMode,
    unlockedMovies,
    setUnlockedMovies,
    unlockMovieLocal,
    handlePlayMovie,
  } = useMovies({ addLog });

  const {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    handleCheckoutCart,
  } = useCart({ addLog, triggerCheckout });

  const {
    userEmail,
    setUserEmail,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginError,
    loginSuccess,
    handleLoginSubmit,
    handleLogout,
  } = useAuth({ addLog });

  const contact = useContact({ addLog });

  const reviewsForm = useReviews({ addLog, fetchMoviesAndReviews });

  // ========================
  // EFFECTS
  // ========================
  useEffect(() => {
    fetchAdminTransactions();

    const savedUser = localStorage.getItem("capsulastudios_user");
    if (savedUser) {
      setUserEmail(savedUser);
      addLog(`Sesión restaurada: ${savedUser}`);
    }

    const savedUnlocked = localStorage.getItem("capsulastudios_unlocked");
    if (savedUnlocked) {
      try {
        setUnlockedMovies(JSON.parse(savedUnlocked));
      } catch (e) {}
    }

    const params = new URLSearchParams(window.location.search);
    const successItem = params.get("item");

    if (successItem) {
      const matchedMovie = movies.find((m) => m.id === successItem);
      if (matchedMovie) unlockMovieLocal(matchedMovie.id);
    }
  }, [fetchAdminTransactions, movies]);

  // ========================
  // CHECKOUT SUCCESS
  // ========================
  const handleSandboxSuccess = (itemTitle, price) => {
    const targetMovie = movies.find((m) => m.id === itemTitle);

    if (targetMovie) {
      unlockMovieLocal(targetMovie.id);
    }

    setActiveSandboxUrl(null);
    fetchAdminTransactions();
  };

  // ========================
  // ========================
  // RENDER
  // ========================
  return (
    <div
      className={`min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative ${cinemaMode ? "overflow-hidden" : ""}`}
    >
      {/* ================= NAVBAR ================= */}
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

      {/* ================= MAIN ROUTER ================= */}
      <main className="pt-20">
        {/* ---------- INICIO ---------- */}
        {currentTab === "inicio" && (
          <div>
            <Hero
              onExplore={(type) => {
                setMovieFilter(type || "todos");
                setCurrentTab("producciones");
              }}
            />

            <HomeCategories
              setMovieFilter={setMovieFilter}
              setCurrentTab={setCurrentTab}
              addLog={addLog}
            />

            <FeaturedMovieSection
              movies={movies}
              handlePlayMovie={handlePlayMovie}
              setSelectedMovie={setSelectedMovie}
            />

            <ReviewsSection
              reviews={reviews}
              movies={movies}
              {...reviewsForm}
            />
          </div>
        )}

        {/* ---------- PRODUCCIONES ---------- */}
        {currentTab === "producciones" && (
          <ProductionsPage
            movies={movies}
            movieFilter={movieFilter}
            setMovieFilter={setMovieFilter}
            unlockedMovies={unlockedMovies}
            handlePlayMovie={handlePlayMovie}
            triggerCheckout={triggerCheckout}
            setSelectedMovie={setSelectedMovie}
          />
        )}

        {/* ---------- BLOG ---------- */}
        {currentTab === "blog" && <BlogPage />}

        {/* ---------- MERCH ---------- */}
        {currentTab === "merch" && (
          <MerchPage merchItems={merchItems} addToCart={addToCart} />
        )}

        {/* ---------- NOSOTROS ---------- */}
        {currentTab === "nosotros" && <AboutSection />}

        {/* ---------- CONTACTO ---------- */}
        {currentTab === "contacto" && <ContactSection {...contact} />}

        {/* ---------- LOGIN ---------- */}
        {currentTab === "login" && (
          <LoginSection
            userEmail={userEmail}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            loginError={loginError}
            loginSuccess={loginSuccess}
            handleLoginSubmit={handleLoginSubmit}
            handleLogout={handleLogout}
            setCurrentTab={setCurrentTab}
          />
        )}
      </main>

      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        cartTotal={cartTotal}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        setCurrentTab={setCurrentTab}
        handleCheckoutCart={handleCheckoutCart}
      />

      <MovieModal
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        unlockedMovies={unlockedMovies}
        setCinemaMode={setCinemaMode}
        handlePlayMovie={handlePlayMovie}
        triggerCheckout={triggerCheckout}
      />

      {/* ================= VIDEO PLAYER ================= */}
      <VideoPlayer
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
        setCinemaMode={setCinemaMode}
        cinemaMode={cinemaMode}
        vimeoDetails={vimeoDetails}
        vimeoLoading={vimeoLoading}
        movies={movies}
        addLog={addLog}
      />

      {/* ================= SANDBOX ================= */}
      {activeSandboxUrl && (
        <div className="fixed inset-0 z-[100] bg-black/85">
          <CheckoutSandbox
            onSuccess={handleSandboxSuccess}
            onCancel={() => {
              setActiveSandboxUrl(null);
              addLog("Sandbox de pago cancelado por el usuario.");
            }}
          />
        </div>
      )}

      {/* ================= DEV CONSOLE ================= */}
      <DevConsole
        isOpen={isDevConsoleOpen}
        setIsOpen={setIsDevConsoleOpen}
        systemLogs={systemLogs}
        setSystemLogs={setSystemLogs}
      />

      {/* ================= FOOTER ================= */}
      <footer className="py-12 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentTab("inicio")}
            >
              <RocketLogo />
              <span className="text-sm font-black">CAPSULA ESTUDIOS</span>
            </div>

            <div className="text-[10px] text-[#8E8E8E]">
              © 2026 CAPSULA ESTUDIOS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
