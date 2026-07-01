export const canUserWatchMovie = ({
  movie,
  unlockedMovies,
}) => {

  if (movie.accessType === "free") {
    return true;
  }

  return unlockedMovies.includes(movie.id);

};