export const ACCESS = {
  FREE: "FREE",
  PURCHASED: "PURCHASED",
  LOCKED: "LOCKED",
};

export const canUserWatchMovie = ({ movie, unlockedMovies }) => {
  if (movie.accessType === "free") {
    return {
      allowed: true,
      reason: ACCESS.FREE,
    };
  }

  if (unlockedMovies.includes(movie.id)) {
    return {
      allowed: true,
      reason: ACCESS.PURCHASED,
    };
  }

  return {
    allowed: false,
    reason: ACCESS.LOCKED,
  };
};