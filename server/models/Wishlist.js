const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    posterPath: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);