const axios = require("axios");

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

const getPopularMovies = async (page = 1) => {
  const response = await tmdbClient.get("/movie/popular", {
    params: {
      page,
    },
  });

  return response.data;
};

const getTopRatedMovies = async (page = 1) => {
  const response = await tmdbClient.get("/movie/top_rated", {
    params: {
      page,
    },
  });

  return response.data;
};

const getUpcomingMovies = async (page = 1) => {
  const response = await tmdbClient.get("/movie/upcoming", {
    params: {
      page,
    },
  });

  return response.data;
};

const searchMovies = async (query, page = 1) => {
  const response = await tmdbClient.get("/search/movie", {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

const getMovieDetails = async (movieId) => {
  const response = await tmdbClient.get(`/movie/${movieId}`);

  return response.data;
};

module.exports = {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
};