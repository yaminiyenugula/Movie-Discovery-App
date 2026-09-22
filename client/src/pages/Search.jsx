import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setMovies([]);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/movies/search?query=${encodeURIComponent(
            query
          )}`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();

        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-page">
      <h1>Search Movies</h1>

            <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim().length === 1 && (
        <p>Type at least 2 characters to search.</p>
      )}

      {loading && <p>Searching...</p>}

      {error && <p>{error}</p>}

      {!loading && query.trim() && movies.length === 0 && !error && (
        <p>No movies found.</p>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;