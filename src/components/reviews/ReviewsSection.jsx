import ReviewsList from "./ReviewsList";
import ReviewForm from "./ReviewForm";

export default function ReviewsSection(props) {
  return (
    <section className="bg-black py-20 px-6 border-y border-[#161616]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl text-white font-extrabold">
            Reseñas de la Comunidad
          </h2>
        </div>

        <ReviewsList reviews={props.reviews} />

        <ReviewForm {...props} />

      </div>
    </section>
  );
}