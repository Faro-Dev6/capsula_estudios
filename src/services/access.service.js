export const SUBSCRIPTIONS = {
  FREE: "FREE",
  STANDARD: "STANDARD",
  PREMIUM: "PREMIUM",
};

export const ACCESS = {
  ALLOWED: "ALLOWED",
  RENT_REQUIRED: "RENT_REQUIRED",
  LOCKED: "LOCKED",
};

export const CONTENT = {
  SHORT: "SHORT",
  MOVIE: "MOVIE",
  PREMIERE: "PREMIERE",
};

export const RENTAL = {
  HOURS: 24,
};

export const AGE_RATING = {
  ATP: "ATP",
  SAM_13: "SAM 13",
  SAM_16: "SAM 16",
  SAM_18: "SAM 18",
};

export const canUserWatchMovie = ({
  movie,
  user,
  rentedMovies = [],
}) => {
  // Cortos gratuitos
  if (movie.contentType === CONTENT.SHORT) {
    return {
      allowed: true,
      reason: ACCESS.ALLOWED,
    };
  }

  // Premium
  if (
    movie.contentType === CONTENT.PREMIERE &&
    user.subscription === SUBSCRIPTIONS.PREMIUM
  ) {
    return {
      allowed: true,
      reason: ACCESS.ALLOWED,
    };
  }

  // Catálogo completo
  if (
    movie.contentType === CONTENT.MOVIE &&
    (user.subscription === SUBSCRIPTIONS.STANDARD ||
      user.subscription === SUBSCRIPTIONS.PREMIUM)
  ) {
    return {
      allowed: true,
      reason: ACCESS.ALLOWED,
    };
  }

  // Alquiler individual
  if (rentedMovies.includes(movie.id)) {
    return {
      allowed: true,
      reason: ACCESS.RENTED,
    };
  }

  return {
    allowed: false,
    reason: ACCESS.LOCKED,
  };
};