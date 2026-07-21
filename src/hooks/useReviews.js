import { useState } from "react";
import { submitReviewApi } from "../services/apiService";

export default function useReviews({ addLog, fetchMoviesAndReviews }) {
  const [reviewName, setReviewName] = useState("");
  const [reviewMovie, setReviewMovie] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewMovie || !reviewComment) return;

    try {
      const res = await submitReviewApi({
        movie: reviewMovie,
        user: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      });

      if (res.ok) {
        setReviewSubmitted(true);
        addLog(`Nueva reseña enviada para "${reviewMovie}" de ${reviewName}`);

        fetchMoviesAndReviews();

        setTimeout(() => {
          setReviewSubmitted(false);
          setReviewName("");
          setReviewComment("");
        }, 3000);
      }
    } catch (err) {
      addLog("Fallo al enviar reseña al backend.");
    }
  };

  return {
    reviewName,
    setReviewName,
    reviewMovie,
    setReviewMovie,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    reviewSubmitted,
    handleReviewSubmit,
  };
}