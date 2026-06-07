import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Terminal, ChevronDown } from "lucide-react";

export function RocketLogo() {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-10 h-10 text-white" 
      stroke="currentColor" 
      fill="none" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Outer rocket capsule shape */}
      <path d="M 50 12 C 65 24, 72 40, 72 58 C 72 68, 68 76, 68 76 C 68 76, 60 72, 50 82 C 40 72, 32 76, 32 76 C 32 76, 28 68, 28 58 C 28 40, 35 24, 50 12 Z" />
      {/* Portal window: double circle */}
      <circle cx="50" cy="35" r="9" />
      <circle cx="50" cy="35" r="5" />
      {/* Left fin */}
      <path d="M 31 71 C 26 76, 25 84, 25 87 C 27 85, 34 81, 37 80" />
      {/* Right fin */}
      <path d="M 69 71 C 74 76, 75 84, 75 87 C 73 85, 66 81, 63 80" />
      {/* Center fin */}
      <path d="M 50 68 C 47 73, 47 88, 50 90 C 53 88, 53 73, 50 68 Z" />
    </svg>
  );
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  onOpenCart,
  userEmail,
  onLogout,
  onOpenDevConsole,
  moviesTypeFilter
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (tabId, typeFilter) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    if (typeFilter && moviesTypeFilter) {
      moviesTypeFilter(typeFilter);
    }
  };

  const menuItems = [
    { id: "blog", label: "Blog" },
    { id: "merch", label: "Merch Shop" },
    { id: "nosotros", label: "Nosotros" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/95 backdrop-blur-md border-b border-[#161616]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Container */}
        <div 
          onClick={() => handleMenuClick("inicio")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-transparent flex items-center justify-center text-white font-bold tracking-tighter shadow-md hover:scale-105 transition-transform">
            <RocketLogo />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-sans font-extrabold tracking-widest text-white leading-none">CAPSULA ESTUDIOS</h1>
            <span className="text-[9px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase font-bold">Productora Cine</span>
          </div>
        </div>

        {/* Desktop Web Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Dropdown for Producciones */}
          <div className="relative group/dep" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button
              onClick={() => handleMenuClick("producciones", "todos")}
              className={`flex items-center gap-1 cursor-pointer py-2 transition-colors ${
                currentTab === "producciones" ? "text-[#9D0208]" : "text-[#F5F5F5] hover:text-[#D4AF37]"
              }`}
            >
              <span>Producciones</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown list */}
            <div
              className={`absolute top-full left-0 w-44 bg-[#161616] border border-[#222] rounded-lg p-2 shadow-2xl transition-all duration-200 transform origin-top-left ${
                dropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={() => handleMenuClick("producciones", "todos")}
                className="w-full text-left px-3 py-2 hover:bg-[#050505] rounded text-xs text-[#F5F5F5] hover:text-[#D4AF37] cursor-pointer"
              >
                Todas las Obras
              </button>
              <button
                onClick={() => handleMenuClick("producciones", "pelicula")}
                className="w-full text-left px-3 py-2 hover:bg-[#050505] rounded text-xs text-[#F5F5F5] hover:text-[#D4AF37] cursor-pointer"
              >
                Películas
              </button>
              <button
                onClick={() => handleMenuClick("producciones", "corto")}
                className="w-full text-left px-3 py-2 hover:bg-[#050505] rounded text-xs text-[#F5F5F5] hover:text-[#D4AF37] cursor-pointer"
              >
                Cortometrajes
              </button>
            </div>
          </div>

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`transition-colors py-2 cursor-pointer ${
                currentTab === item.id ? "text-[#9D0208]" : "text-[#F5F5F5] hover:text-[#D4AF37]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Widgets Layout */}
        <div className="flex items-center gap-4">
          {/* Developer System Logger Logs Panel tab */}
          <button
            onClick={onOpenDevConsole}
            title="Consola de Integraciones API"
            className="p-2 text-[#8E8E8E] hover:text-white bg-[#101010] border border-[#222] rounded-lg transition-transform hover:scale-105 relative cursor-pointer hidden sm:flex"
          >
            <Terminal className="w-4 h-4 text-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </button>

          {/* Cart Widget Icon with badge */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#F5F5F5] hover:text-[#D4AF37] transition-all relative cursor-pointer"
            id="nav-cart-btn"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#9D0208] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Logged in / Signin widget button */}
          {userEmail ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMenuClick("login")}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#161616] hover:bg-[#222] border border-[#333] rounded-lg text-xs cursor-pointer text-white"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[110px] truncate">{userEmail}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-[#8E8E8E] hover:text-[#9D0208] transition-colors cursor-pointer"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleMenuClick("login")}
              className={`flex items-center gap-1.5 px-4 py-1.5 bg-[#9D0208] hover:bg-[#b0030a] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-md shadow-[#9D0208]/20`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Ingresar</span>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F5] hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-[#161616] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-mono text-[#8E8E8E] block mb-2">Secciones</span>
            <button
              onClick={() => handleMenuClick("producciones", "todos")}
              className="w-full text-left py-2 border-b border-[#111] text-sm text-[#F5F5F5] hover:text-[#D4AF37]"
            >
              Películas y Cortos
            </button>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="w-full text-left py-2 border-b border-[#111] text-sm text-[#F5F5F5] hover:text-[#D4AF37]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onOpenDevConsole}
              className="w-full text-left py-2 text-sm text-[#D4AF37] flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" /> Consola de APIs & Webhooks
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
