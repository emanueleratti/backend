const mongoose = require("mongoose");

const UsersModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "not specified"],
      required: false,
      default: "not specified",
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BooksModel",
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("UsersModel", UsersModel, "users");
