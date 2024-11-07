const mongoose = require("mongoose");

const ReviewsModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersModel",
    },
    rate: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BooksModel",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("ReviewsModel", ReviewsModel, "reviews");
