import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const categories = [
  {
    name: "Popular",
    endpoint: "popular",
  },
  {
    name: "Top Rated",
    endpoint: "top-rated",
  },
  {
    name: "Upcoming",
    endpoint: "upcoming",
  },
];

const Home = () => {
  const [category, setCategory] = useState("popular");
  const [movies, setMovies] = useState([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = async (
  selectedCategory,
  selectedPage = 1,
  loadMore = false
) => {
  try {
    setLoading(true);
    setError("");

    const response = await fetch(
      `http://localhost:5000/api/movies/${selectedCategory}?page=${selectedPage}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    if (loadMore) {
      setMovies((previousMovies) => [
        ...previousMovies,
        ...(data.results || []),
      ]);
    } else {
      setMovies(data.results || []);
    }

    setPage(selectedPage);
    setTotalPages(data.total_pages || 1);
  } catch (error) {
    console.error(error);
    setError("Failed to load movies. Please try again.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  setPage(1);
  fetchMovies(category, 1, false);
}, [category]);

  return (
    <div className="home">
      <h1>Discover Movies</h1>

      <div className="category-buttons">
        {categories.map((item) => (
          <button
            key={item.endpoint}
            className={
              category === item.endpoint
                ? "category-button active"
                : "category-button"
            }
            onClick={() => setCategory(item.endpoint)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="loading">
          Loading movies...
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>

          <button onClick={() => fetchMovies(category)}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="empty-state">
          <p>No movies found.</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}

      {!loading && !error && page < totalPages && (
  <div className="load-more-container">
    <button
      className="load-more-button"
      onClick={() =>
        fetchMovies(category, page + 1, true)
      }
    >
      Load More
    </button>
  </div>
)}
    </div>
  );
};

export default Home;