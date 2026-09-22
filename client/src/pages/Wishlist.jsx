import MovieCard from "../components/MovieCard";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const {
    wishlist,
    loading,
    removeFromWishlist,
  } = useWishlist();

  if (loading) {
    return (
      <div className="wishlist-page">
        <h1>Loading Wishlist...</h1>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="movie-grid">
          {wishlist.map((movie) => {
            const movieForCard = {
              id: movie.movieId,
              title: movie.title,
              poster_path: movie.posterPath,
              release_date: movie.releaseDate,
              vote_average: movie.rating,
            };

            return (
              <div key={movie.movieId} className="wishlist-item">
                <MovieCard movie={movieForCard} />

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromWishlist(movie.movieId)
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;