const mongoose = require("mongoose");

const OAuthUsersModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});
