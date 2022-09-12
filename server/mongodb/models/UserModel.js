const mongoose = require("mongoose");

//User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//User model
const User = mongoose.model("user", userSchema);

module.exports = User;
