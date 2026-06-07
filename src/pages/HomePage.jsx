import Hero from "../components/Hero";
import HomeCategories from "../components/HomeCategories";
import FeaturedMovieSection from "../components/FeaturedMovieSection";
import ReviewsSection from "../components/reviews/ReviewsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeCategories />
      <FeaturedMovieSection />
      <ReviewsSection />
    </>
  );
}