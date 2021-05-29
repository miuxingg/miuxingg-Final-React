const express = require("express");
const Route = express.Router();
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/Products/categoryController");
Route.route("/").post(createCategory).get(getAllCategory);
Route.route("/:id").put(updateCategory).delete(deleteCategory);
module.exports = Route;
