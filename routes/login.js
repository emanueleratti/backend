const express = require("express");
const login = express.Router();
const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

login.post("/login", async (request, response, next) => {
  const TOKEN = process.env.JWT_SECRET;
  try {
    const user = await UsersModel.findOne({ username: request.body.username });
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "User not found with requested username",
      });
    }
    const checkPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!checkPassword) {
      return response.status(403).send({
        statusCode: 403,
        message: "Password is invalid",
      });
    }

    const token = jwt.sign({ id: user._id }, TOKEN, { expiresIn: "1h" });

    response.header("isAuth", token).status(200).send({
      statusCode: 200,
      message: "User correctly logged in",
      username: request.body.username,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = login;
