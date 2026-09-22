const {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
} = require("../services/tmdbService");

const popularMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const data = await getPopularMovies(page);

    res.json(data);
  } catch (error) {
    console.error("TMDB Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch popular movies",
    });
  }
};

const searchMovieResults = async (req, res) => {
  try {
    const query = req.query.query;
    const page = Number(req.query.page) || 1;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const data = await searchMovies(query.trim(), page);

    res.json(data);
  } catch (error) {
    console.error("TMDB Search Error:", error.message);

    res.status(500).json({
      message: "Failed to search movies",
    });
  }
};


const movieDetails = async (req, res) => {
  try {
    const movieId = Number(req.params.id);

    if (!movieId) {
      return res.status(400).json({
        message: "Movie ID is required",
      });
    }

    const data = await getMovieDetails(movieId);

    res.json(data);
  } catch (error) {
    console.error("Movie Details Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch movie details",
    });
  }
};

const topRatedMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const data = await getTopRatedMovies(page);

    res.json(data);
  } catch (error) {
    console.error("Top Rated Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch top rated movies",
    });
  }
};

const upcomingMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const data = await getUpcomingMovies(page);

    res.json(data);
  } catch (error) {
    console.error("Upcoming Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch upcoming movies",
    });
  }
};

module.exports = {
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  searchMovieResults,
  movieDetails,
};