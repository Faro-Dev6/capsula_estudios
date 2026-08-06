// Determina si un usuario puede reproducir un contenido
export const canUserWatchMovie = ({
  user,
  movie,
  rentedMovies = [],
}) => {
  // Contenido gratuito
  if (movie.contentType === SUBSCRIPTIONS.FREE) {
    return {
      allowed: true,
      reason: ACCESS.ALLOWED,
    };
  }

  // Estrenos exclusivos
  if (movie.contentType === SUBSCRIPTIONS.PREMIUM) {
    return {
      allowed: user.subscription === SUBSCRIPTIONS.PREMIUM,
      reason:
        user.subscription === SUBSCRIPTIONS.PREMIUM
          ? ACCESS.ALLOWED
          : ACCESS.LOCKED,
    };
  }

  // Catálogo estándar
  if (movie.contentType === SUBSCRIPTIONS.STANDARD) {
    // Usuario con Standard o Premium
    if (
      user.subscription === SUBSCRIPTIONS.STANDARD ||
      user.subscription === SUBSCRIPTIONS.PREMIUM
    ) {
      return {
        allowed: true,
        reason: ACCESS.ALLOWED,
      };
    }

    // Usuario que alquiló la película
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
  }

  return {
    allowed: false,
    reason: ACCESS.LOCKED,
  };
};