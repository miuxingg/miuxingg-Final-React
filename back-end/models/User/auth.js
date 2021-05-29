const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      minlength: [6, "Password be at 6 character"],
    },
    avatar: {
      type: String,
      trim: true,
      required: [true, "Avatar must be require"],
    },
    isAdmin: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model("user_accounts", userSchema);
