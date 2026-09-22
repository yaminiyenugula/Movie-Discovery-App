import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="poster-container">
          {poster ? (
            <img
              src={poster}
              alt={movie.title || "Movie poster"}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
          ) : null}

          <div
            className="poster-fallback"
            style={{
              display: poster ? "none" : "flex",
            }}
          >
            No Poster
          </div>
        </div>

        <div className="movie-info">
          <h3 title={movie.title}>
            {movie.title || "Untitled Movie"}
          </h3>

          <div className="movie-meta-small">
            <span>
              ⭐{" "}
              {movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "N/A"}
            </span>

            <span>
              {movie.release_date
                ? movie.release_date.substring(0, 4)
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;