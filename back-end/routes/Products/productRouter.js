const express = require("express");
const Route = express.Router();

const {
  createProduct,
  getProduct,
  getProductByCate,
  updateOneProduct,
  deleteOneProduct,
} = require("../../controllers/Products/productController");
const imageUpload = require("../../middlewares/uploadProductImage");
const validateImage = require("../../middlewares/validateImage");
Route.route("/")
  .post(imageUpload, validateImage, createProduct)
  .get(getProduct);
Route.route("/:idProd")
  .put(imageUpload, validateImage, updateOneProduct)
  .delete(deleteOneProduct);
Route.route("/category/:idCate").get(getProductByCate);
module.exports = Route;
