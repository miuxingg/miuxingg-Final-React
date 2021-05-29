const Prod = require("../../models/Products/product");
const Cate = require("../../models/Products/category");
const fs = require("fs");
exports.createProduct = async (req, res, next) => {
  try {
    const avatar = req.file.path;
    const body = JSON.parse(req.body.data);
    const { name, description, price, categoryId } = body;
    const cate = await Cate.findById(categoryId);
    if (typeof price !== "number") {
      const err = new Error("Price must be Number");
      err.statusCode = 400;
      return next(err);
    }
    const data = await Prod.create({
      name,
      price,
      description,
      categoryId,
      avatar,
    });
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProduct = (req, res, next) => {};
exports.getProductByCate = async (req, res, next) => {
  try {
    const { idCate } = req.params;
    const data = await Prod.find({ categoryId: idCate });
    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOneProduct = async (req, res, next) => {
  try {
    const { idProd } = req.params;
    const avatar = req.file.path;
    const body = JSON.parse(req.body.data);
    const { name, description, price, categoryId } = body;
    if (typeof price !== "number") {
      const err = new Error("Price must be Number");
      err.statusCode = 400;
      return next(err);
    }
    const oldData = await Prod.findByIdAndUpdate(idProd, {
      avatar,
      name,
      description,
      price,
      categoryId,
    });

    fs.unlink(`${oldData.avatar}`, function (err) {
      if (err) next(err);
    });

    res.status(200).json({
      status: "success",
      data: oldData,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOneProduct = async (req, res, next) => {
  try {
    const { idProd } = req.params;
    const prodDelete = await Prod.findByIdAndDelete(idProd);
    fs.unlink(`${prodDelete.avatar}`, function (err) {
      if (err) next(err);
    });
    res.status(200).json({
      status: "success",
      data: prodDelete,
    });
  } catch (error) {
    next(error);
  }
};
