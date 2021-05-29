const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Name product must be require"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description product must be require"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price must be require"],
    },
    avatar: {
      type: String,
      trim: true,
      required: [true, "Avata must be require"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorys",
      trim: true,
      required: [true, "Category must be require"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
