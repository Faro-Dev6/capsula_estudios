import { moviesDb } from "../data/movies.js";
import { pressReviews } from "../data/reviews.js";

export const getMovies = (req, res) => {
  res.json({
    movies: moviesDb,
    reviews: pressReviews
  });
};