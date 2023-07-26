const API_KEY = "93fdc83520ff05f10a543a6c2d6a3bbc";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&region=AU`).then(
    (res) => res.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?language=en-US&page=1&region=AU&api_key=${API_KEY}`
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1&region=AU&api_key=${API_KEY}`
  ).then((res) => res.json());

export const moviesApi = { trending, upcoming, nowPlaying };
