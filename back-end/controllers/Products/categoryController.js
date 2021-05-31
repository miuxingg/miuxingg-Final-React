const Cate = require("../../models/Products/category");
exports.createCategory = async (req, res, next) => {
  try {
    const cate = await Cate.create({ ...req.body });
    res.status(200).json({
      status: "success",
      data: cate,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const data = await Cate.find({}).select("cateName");
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await Cate.findByIdAndUpdate(id, { ...req.body });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Cate.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
