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

//Routes
const User = require("./routes/User/authRouter");
app.use("/", User);
//Event handding

app.listen(PORT, () => console.log(`App running port ${PORT}`));
