import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

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
import useTheme from "./hooks/useTheme";

import Navbar, { RocketLogo } from "./components/Navbar";
import CartDrawer from "./components/cart/CartDrawer";
import MovieModal from "./components/MovieModal";
import VideoPlayer from "./components/VideoPlayer";
import DevConsole from "./components/DevConsole";
import MainRouter from "./components/layout/MainRouter";
import merchItems from "./data/merchItems";
import CheckoutSandbox from "./components/CheckoutSandbox";
import { freeUser } from "./data/currentUser";

export default function App() {
  // ========================
  // STATE
  // ========================
  const [currentTab, setCurrentTab] = useState("inicio");
  const [movieFilter, setMovieFilter] = useState("todos");

  const [activeSandboxUrl, setActiveSandboxUrl] = useState(null);
  const [sandboxItemTitle, setSandboxItemTitle] = useState("");
  const [sandboxPrice, setSandboxPrice] = useState(0);
  const [currentUser, setCurrentUser] = useState (freeUser);
  
  const { theme, nextTheme } = useTheme();

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
  } = useMovies({ addLog, currentUser, });

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
  } = useAuth({ addLog , setCurrentUser,});

  const contact = useContact({ addLog });

  // const reviewsForm = useReviews({ addLog, fetchMoviesAndReviews });

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
      className={`min-h-screen bg-background text-foreground font-sans relative ${cinemaMode ? "overflow-hidden" : ""}`}
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
        theme={theme}
        nextTheme={nextTheme}
        moviesTypeFilter={(type) => {
          setMovieFilter(type);
          setCurrentTab("producciones");
        }}
      />

      {/* ================= MAIN ROUTER ================= */}
      <MainRouter
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        movies={movies}
        reviews={reviews}
        movieFilter={movieFilter}
        setMovieFilter={setMovieFilter}
        unlockedMovies={unlockedMovies}
        handlePlayMovie={handlePlayMovie}
        triggerCheckout={triggerCheckout}
        setSelectedMovie={setSelectedMovie}
        merchItems={merchItems}
        addToCart={addToCart}
        contact={contact}
        addLog={addLog}

        userEmail={userEmail}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        loginError={loginError}
        loginSuccess={loginSuccess}
        handleLoginSubmit={handleLoginSubmit}
        handleLogout={handleLogout}
        currentUser={currentUser}
        />
      

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
        currentUser={currentUser}
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
        movies={movies}
        handlePlayMovie={handlePlayMovie}
        unlockMovieLocal={unlockMovieLocal}
        setUnlockedMovies={setUnlockedMovies}
        activeVideo={activeVideo}
      />

      {/* ================= FOOTER ================= */}
      <footer className="py-12 px-6 bg-surface-secondary border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentTab("inicio")}
            >
              <RocketLogo />
              <span className="text-sm font-black">CAPSULA ESTUDIOS</span>
            </div>

            <div className="text-[10px] text-foreground-muted">
              © 2026 CAPSULA ESTUDIOS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
