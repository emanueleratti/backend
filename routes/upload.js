const express = require("express");
const upload = express.Router();
const uploadLocal = require("../middlewares/multer/uploadLocal");
const uploadCloud = require("../middlewares/multer/uploadCloud");
const isAuthenticated = require("../middlewares/isAuthenticated");

// UPLOAD LOCAL
upload.post(
  "/upload/local",
  isAuthenticated,
  uploadLocal.single("image"),
  (request, response, next) => {
    try {
      response.status(201).send({
        statusCode: 201,
        message: "Image uploaded locally successfully",
        img: request.file.path,
      });
    } catch (error) {
      next(error);
    }
  }
);

// UPLOAD CLOUD
upload.post(
  "/upload/cloud",
  isAuthenticated,
  uploadCloud.single("image"),
  (request, response, next) => {
    try {
      response.status(201).send({
        statusCode: 201,
        message: "Image uploaded to cloud successfully",
        img: request.file.path,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = upload;
