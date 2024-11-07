const mongoose = require("mongoose");

const BooksModel = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
      default: "https://placehold.co/400x600",
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
    },
    category: {
      type: String,
      enum: ["scifi", "fantasy", "horror", "history", "romance"],
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewsModel",
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("BooksModel", BooksModel, "books");
