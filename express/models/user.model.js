const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  providerId: {
    type: String,
    default: null,
  },
  provider: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
