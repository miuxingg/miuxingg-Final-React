const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username must be require"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email must be require"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password must be require"],
    },
    avatar: {
      type: String,
      trim: true,
      required: [true, "Avatar must be require"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_accounts", userSchema);
