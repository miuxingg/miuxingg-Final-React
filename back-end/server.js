require("dotenv").config();
const express = require("express");
const PORT = process.env.APP_PORT || 5000;
const app = express();
const cors = require("cors");

//connect frontend
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//connect database
const { connect } = require("./config/db/db");
connect();

app.use("/uploads", express.static("uploads"));

//Routes account
const User = require("./routes/User/authRouter");
app.use("/api/v1/auth", User);

//Routes category
const Category = require("./routes/Products/categoryRouter");
app.use("/api/v1/category", Category);

//Routes Products
const Product = require("./routes/Products/productRouter");
app.use("/api/v1/product", Product);

//Event handding
app.all("*", (req, res, next) => {
  const err = new Error("The route is not correct");
  err.statusCode = 403;
  next(err);
});

const { errorHandler } = require("./middlewares/errorHandler");
app.use(errorHandler);
app.listen(PORT, () => console.log(`App running port ${PORT}`));
