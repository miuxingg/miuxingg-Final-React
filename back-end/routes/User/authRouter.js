const express = require("express");
const Route = express.Router();
const {
  register,
  login,
  currentUser,
} = require("../../controllers/User/authController");
const { verifyToken } = require("../../middlewares/verifyToken");
const uploadImage = require("../../middlewares/uploadImage");
const validateImage = require("../../middlewares/validateImage");
Route.route("/register").post(uploadImage, validateImage, register);
Route.route("/login").post(login);
Route.route("/currentUser").get(verifyToken, currentUser);

module.exports = Route;
