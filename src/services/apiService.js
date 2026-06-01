export const fetchMoviesAndReviewsApi = async () => {
  const res = await fetch("/api/movies");
  return res.json();
};

export const fetchAdminTransactionsApi = async () => {
  const res = await fetch("/api/admin/transactions");
  return res.json();
};

export const fetchVimeoApi = async (vimeoId) => {
  const res = await fetch(`/api/vimeo/${vimeoId}`);
  return res.json();
};

export const createCheckoutApi = async ({
  title,
  price,
  isMerch = false,
  itemId = "",
}) => {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      price,
      isMerch,
      itemId,
    }),
  });

  return response.json();
};

export const submitReviewApi = async ({
  movie,
  user,
  rating,
  comment,
}) => {
  return fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie,
      user,
      rating,
      comment,
    }),
  });
};