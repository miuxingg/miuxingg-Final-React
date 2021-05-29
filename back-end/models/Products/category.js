const mongoose = require("mongoose");
const cateSchema = mongoose.Schema(
  {
    cateName: {
      type: String,
      unique: true,
      required: [true, "Category must be require"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categorys", cateSchema);
