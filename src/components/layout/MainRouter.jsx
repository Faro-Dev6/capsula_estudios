import Hero from "../Hero";
import HomeCategories from "../HomeCategories";
import FeaturedMovieSection from "../FeaturedMovieSection";
import ReviewsSection from "../reviews/ReviewsSection";

import ProductionsPage from "../../pages/ProductionsPage";
import BlogPage from "../../pages/BlogPage";
import MerchPage from "../../pages/MerchPage";

import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import LoginSection from "../sections/LoginSection";

export default function MainRouter({
  currentTab,
  setCurrentTab,
  movies,
  reviews,
  movieFilter,
  setMovieFilter,
  unlockedMovies,
  handlePlayMovie,
  triggerCheckout,
  setSelectedMovie,
  merchItems,
  addToCart,
  contact,
  reviewsForm,
  addLog,
}) {
  return (
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
          {...reviewsForm.login}
          setCurrentTab={setCurrentTab}
        />
      )}
    </main>
  );
}