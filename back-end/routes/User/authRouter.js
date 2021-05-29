const express = require("express");
const Route = express.Router();
const {
  register,
  login,
  currentUser,
  updateProfile,
} = require("../../controllers/User/authController");
const { verifyToken } = require("../../middlewares/verifyToken");
const uploadImage = require("../../middlewares/uploadAvtImage");
const validateImage = require("../../middlewares/validateImage");
Route.route("/register").post(register);
Route.route("/login").post(login);
Route.route("/currentUser").get(verifyToken, currentUser);
Route.route("/updateProfile").put(
  uploadImage,
  validateImage,
  verifyToken,
  updateProfile
);

module.exports = Route;
