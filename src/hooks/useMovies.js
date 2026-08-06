import { useState } from "react";
import {canUserWatchMovie,ACCESS} from "../services/access.service";

export default function useMovies({ addLog, currentUser }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [vimeoDetails, setVimeoDetails] = useState(null);
  const [vimeoLoading, setVimeoLoading] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [unlockedMovies, setUnlockedMovies] = useState([]);

  const unlockMovieLocal = (movieId) => {
    const updated = [...unlockedMovies, movieId];
    setUnlockedMovies(updated);
    localStorage.setItem("capsulastudios_unlocked", JSON.stringify(updated));

    addLog?.(`Película desbloqueada: ${movieId}`);
  };

const handlePlayMovie = (movie) => {
  const result = canUserWatchMovie({
    movie,
    user: currentUser,
    rentedMovies: currentUser.rentals,
  });

  if (!result.allowed) {
    addLog?.(`Acceso denegado: ${movie.title}`);
    setSelectedMovie(movie);
    return;
  }

    currentUser.history.push({
    movieId: movie.id,
    watchedAt: new Date().toISOString(),
    completed: false,
    progress: 0,
});

setActiveVideo(movie);

if (movie.vimeoId) {
  fetchVimeo(movie.vimeoId);
}

addLog?.(`Reproduciendo: ${movie.title}`);
};

  const fetchVimeo = async (vimeoId) => {
    setVimeoLoading(true);
    setVimeoDetails(null);

    try {
      const res = await fetch(`/api/vimeo/${vimeoId}`);
      const data = await res.json();

      setVimeoDetails(data);

      addLog?.(`Vimeo cargado (${data.vimeoConfigured ? "real" : "mock"})`);
    } catch (err) {
      addLog?.(`Error Vimeo: ${err.message}`);
    } finally {
      setVimeoLoading(false);
    }
  };

  return {
    selectedMovie,
    setSelectedMovie,
    activeVideo,
    setActiveVideo,
    vimeoDetails,
    vimeoLoading,
    cinemaMode,
    setCinemaMode,
    unlockedMovies,
    setUnlockedMovies,
    unlockMovieLocal,
    handlePlayMovie,
  };
}
