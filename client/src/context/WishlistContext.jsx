import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/wishlist"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();

      setWishlist(data);
    } catch (error) {
      console.error("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (movie) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add movie");
        return;
      }

      setWishlist((previous) => [...previous, data]);
    } catch (error) {
      console.error("Add Wishlist Error:", error);
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${movieId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove movie");
      }

      setWishlist((previous) =>
        previous.filter((movie) => movie.movieId !== movieId)
      );
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
    }
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.movieId === movieId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};