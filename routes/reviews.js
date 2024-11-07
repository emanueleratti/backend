const express = require("express");
const reviews = express.Router();
const BooksModel = require("../models/BooksModel");
const UsersModel = require("../models/UsersModel");
const ReviewsModel = require("../models/ReviewsModel");

// GET REVIEWS
reviews.get("/reviews", async (request, response, next) => {
  try {
    const reviews = await ReviewsModel.find()
      .populate({
        path: "user",
        select: "username",
      })
      .populate("book");

    console.log(reviews);

    response.status(200).send({
      statusCode: 200,
      message: "Reviews found successfully",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

// POST REVIEW
reviews.post("/reviews/create", async (request, response, next) => {
  const { rate, review } = request.body;

  try {
    const user = await UsersModel.findOne({ _id: request.body.user });
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    const book = await BooksModel.findOne({ _id: request.body.book });
    if (!book) {
      return response.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }

    const newReview = new ReviewsModel({
      rate,
      review,
      user: user._id,
      book: book._id,
    });

    const savedReview = await newReview.save();
    await BooksModel.updateOne(
      { _id: book._id },
      { $push: { reviews: savedReview } }
    );
    response.status(200).send({
      statusCode: 200,
      message: "Review added successfully",
    });
  } catch (error) {
    next(error);
  }
});

// EDIT REVIEW
reviews.patch("/reviews/:id", async (request, response, next) => {
  const { id } = request.params;
  const { rate, review } = request.body;

  try {
    const updatedReview = await ReviewsModel.findByIdAndUpdate(
      id,
      { rate, review },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return response.status(404).send({
        statusCode: 404,
        message: "Review not found",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE REVIEW
reviews.delete("/reviews/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const deletedReview = await ReviewsModel.findByIdAndDelete(id);

    if (!deletedReview) {
      return response.status(404).send({
        statusCode: 404,
        message: "Review not found",
      });
    }

    // Rimuovi la recensione anche dal libro associato
    await BooksModel.updateOne(
      { _id: deletedReview.book },
      { $pull: { reviews: id } }
    );

    response.status(200).send({
      statusCode: 200,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = reviews;
