import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/movies/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="details-page">Loading movie details...</div>;
  }

  if (error) {
    return <div className="details-page">{error}</div>;
  }

  if (!movie) {
    return <div className="details-page">Movie not found.</div>;
  }

  return (
    <div className="details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="movie-details">
        <div className="details-poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Poster"
            }
            alt={movie.title}
          />
        </div>

        <div className="details-content">
          <h1>{movie.title}</h1>

          {movie.tagline && <p className="tagline">{movie.tagline}</p>}

          <div className="movie-meta">
            <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>

            <span>
              {movie.release_date
                ? movie.release_date.substring(0, 4)
                : "N/A"}
            </span>

            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>

          <button
  className="wishlist-button"
  onClick={() => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  }}
>
  {isInWishlist(movie.id)
    ? "❤️ Remove from Wishlist"
    : "🤍 Add to Wishlist"}
</button>

          <h2>Overview</h2>

          <p className="overview">
            {movie.overview || "No overview available."}
          </p>

          <h2>Genres</h2>

          <div className="genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;