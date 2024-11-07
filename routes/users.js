const express = require("express");
const users = express.Router();
const UsersModel = require("../models/UsersModel");
const validateUserBody = require("../middlewares/validateUsers");
const bcrypt = require("bcrypt");

// GET USERS
users.get("/users", async (request, response, next) => {
  try {
    const users = await UsersModel.find();
    if (users.length === 0) {
      response.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "Users found successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
});

// GET USERS BY ID
users.get("/users/id/:userId", async (request, response, next) => {
  const { userId } = request.params;
  try {
    const user = await UsersModel.findById(userId);
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// GET USERS BY EMAIL
users.get("/users/email/:email", async (request, response, next) => {
  const { email } = request.params;
  try {
    const user = await UsersModel.findOne({ email: email });
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// GET USERS BY USERNAME
users.get("/users/username/:username", async (request, response, next) => {
  const { username } = request.params;
  try {
    const user = await UsersModel.findOne({ username: username });
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// POST CREATE USERS
users.post(
  "/users/create",
  validateUserBody,
  async (request, response, next) => {
    const newUser = new UsersModel({
      ...request.body,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    try {
      const user = await newUser.save();
      response.status(201).send({
        statusCode: 201,
        message: "User created successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PATCH UPDATE USERS
users.patch("/users/update/:userId", async (request, response, next) => {
  const { userId } = request.params;
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      userId,
      request.body,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE USERS
users.delete("/users/delete/:userId", async (request, response, next) => {
  const { userId } = request.params;
  try {
    const user = await UsersModel.findByIdAndDelete(userId);
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    response.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = users;
