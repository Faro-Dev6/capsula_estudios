import { useState, useEffect } from "react";
import { fetchMoviesAndReviewsApi } from "../services/apiService";

export default function useContent({ addLog }) {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchMoviesAndReviews = async () => {
    try {
      addLog?.("Llamando a la API local /api/movies...");

      const data = await fetchMoviesAndReviewsApi();

      setMovies(data.movies || []);
      setReviews(data.reviews || []);

      addLog?.(
        `Películas (${data.movies?.length || 0}) y Reseñas (${data.reviews?.length || 0}) cargadas exitosamente.`
      );
    } catch (err) {
      addLog?.(`Error al conectar con el servidor backend: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchMoviesAndReviews();
  }, []);

  return {
    movies,
    reviews,
    fetchMoviesAndReviews,
  };
}