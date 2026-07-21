// import { customReviews } from "../data/reviews.js";

// export const createReview = (req, res) => {
//   const { movie, user, rating, comment } = req.body;

//   if (!movie || !user || !rating || !comment) {
//     return res.status(400).json({
//       error: "Faltan campos obligatorios"
//     });
//   }

//   const newReview = {
//     id: customReviews.length + 1,
//     movie,
//     user,
//     rating: Number(rating),
//     comment,
//     date: new Date().toLocaleDateString("es-AR")
//   };

//   customReviews.unshift(newReview);

//   res.json({
//     success: true,
//     review: newReview
//   });
// };

import { pressReviews } from "../data/reviews.js";

export const getPressReviews = (req, res) => {
  res.json({
    success: true,
    reviews: pressReviews
  });
};