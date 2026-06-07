import { useState } from "react";

export default function useMovies({ addLog }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [vimeoDetails, setVimeoDetails] = useState(null);
  const [vimeoLoading, setVimeoLoading] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [unlockedMovies, setUnlockedMovies] = useState([]);

  const unlockMovieLocal = (movieId) => {
    const updated = [...unlockedMovies, movieId];
    setUnlockedMovies(updated);
    localStorage.setItem(
      "capsulastudios_unlocked",
      JSON.stringify(updated)
    );

    addLog?.(`Película desbloqueada: ${movieId}`);
  };

  const handlePlayMovie = (movie) => {
    const isUnlocked =
      unlockedMovies.includes(movie.id) || movie.price === 0;

    if (!isUnlocked) {
      addLog?.(
        `Intento de reproducción bloqueado: ${movie.title}`
      );
      setSelectedMovie(movie);
      return;
    }

    setActiveVideo({
      url: movie.videoUrl,
      title: movie.title,
      id: movie.id,
    });

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

      addLog?.(
        `Vimeo cargado (${data.vimeoConfigured ? "real" : "mock"})`
      );
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