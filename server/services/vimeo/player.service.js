export const buildPlayerData = (movie) => {

  return {
    title: movie.title,
    vimeoId: movie.vimeoId,
    autoplay: true,
    controls: true,
    cinemaMode: true
  };

};