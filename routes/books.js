const express = require("express");
const books = express.Router();
const BooksModel = require("../models/BooksModel");
const validateBooks = require("../middlewares/validateBooks");
const isAuthenticated = require("../middlewares/isAuthenticated");
const uploadLocal = require("../middlewares/multer/uploadLocal");
const uploadCloud = require("../middlewares/multer/uploadCloud");
const path = require("path");

// GET BOOKS
books.get("/books", async (request, response, next) => {
  const {
    search,
    category,
    asin,
    id,
    page = 1,
    pageLimit = 10,
    limit,
  } = request.query;

  try {
    let query = {};
    if (search) {
      query.title = new RegExp(search, "i");
    } else if (category) {
      query.category = category;
    } else if (asin) {
      query.asin = asin;
    } else if (id) {
      query._id = id;
    }

    const books = await BooksModel.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) || pageLimit)
      .skip((page - 1) * pageLimit)
      .populate("reviews");

    const totalBooks = await BooksModel.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / pageLimit);

    if (books.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "No book found",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Books found successfully",
      totalPages,
      count: totalBooks,
      books,
    });
  } catch (error) {
    next(error);
  }
});

// UPLOAD BOOK IMAGE
books.post(
  "/books/upload",
  isAuthenticated,
  uploadLocal.single("image"),
  (request, response, next) => {
    try {
      response.status(200).json({
        img: request.file.path,
      });
    } catch (error) {
      next(error);
    }
  }
);

// CREATE BOOK
books.post(
  "/books/create",
  isAuthenticated,
  validateBooks,
  async (request, response, next) => {
    const newBook = new BooksModel({
      ...request.body,
      img: request.body.img,
    });

    try {
      const book = await newBook.save();
      response.status(201).send({
        statusCode: 201,
        message: "Book added successfully",
        book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE BOOK
books.patch(
  "/books/update/:id",
  isAuthenticated,
  validateBooks,
  async (request, response, next) => {
    const { id } = request.params;
    try {
      const updatedBooks = await BooksModel.findOneAndUpdate(
        { _id: id },
        request.body,
        { new: true }
      );
      if (!updatedBooks) {
        return response.status(404).send({
          statusCode: 404,
          message: "No book found",
        });
      }
      response.status(200).send({
        statusCode: 200,
        message: "Book updated successfully",
        updatedBooks,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE BOOK
books.delete(
  "/books/delete/:id",
  // isAuthenticated,
  async (request, response, next) => {
    const { id } = request.params;
    try {
      const deletedBook = await BooksModel.findOneAndDelete({ _id: id });
      if (!deletedBook) {
        return response.status(404).send({
          statusCode: 404,
          message: "No book found",
        });
      }
      response.status(200).send({
        statusCode: 200,
        message: "Book deleted successfully",
        deletedBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE BOOKS MODEL
books.patch("/books/updateModel", async (request, response, next) => {
  await BooksModel.updateMany(
    { reviews: { $exists: false } },
    { $set: { reviews: [] } }
  );
});

module.exports = books;
