import { moviesDb } from "../data/movies.js";
import { customReviews } from "../data/reviews.js";

export const getMovies = (req, res) => {
  res.json({
    movies: moviesDb,
    reviews: customReviews
  });
};