const express = require("express");
const Route = express.Router();
const { register } = require("../../controllers/User/authController");
const uploadImage = require("../../middlewares/uploadImage");
const validateImage = require("../../middlewares/validateImage");
Route.route("/").post(uploadImage, validateImage, register);

module.exports = Route;
