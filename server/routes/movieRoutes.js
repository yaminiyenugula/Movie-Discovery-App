const express = require("express");

const {
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  searchMovieResults,
  movieDetails,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/popular", popularMovies);

router.get("/top-rated", topRatedMovies);

router.get("/upcoming", upcomingMovies);

router.get("/search", searchMovieResults);

router.get("/:id", movieDetails);

module.exports = router;