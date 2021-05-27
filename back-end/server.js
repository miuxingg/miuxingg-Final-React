require("dotenv").config();
const express = require("express");
const PORT = process.env.APP_PORT || 5000;
const app = express();
const cors = require("cors");
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.listen(PORT, () => console.log(`App running port ${PORT}`));
