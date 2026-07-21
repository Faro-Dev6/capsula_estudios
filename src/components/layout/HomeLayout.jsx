import Hero from "../Hero";
import HomeCategories from "../HomeCategories";
import FeaturedMovieSection from "../FeaturedMovieSection";
import ReviewsSection from "../reviews/ReviewsSection";

export default function HomeLayout() {
  return (
    <>
      <Hero />
      <HomeCategories />
      <FeaturedMovieSection />
      <ReviewsSection />
    </>
  );
}