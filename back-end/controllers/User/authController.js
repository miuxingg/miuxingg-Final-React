const User = require("../../models/User/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = async (req, res, next) => {
  try {
    const avatar = req.file.path;
    const body = JSON.parse(req.body.data);
    const { username, password, email } = body;
    const data = await User.create({ avatar, username, password, email });
    const token = jwt.sign({ userId: data._id }, process.env.SECRET_KEY);
    res.status(200).json({
      status: "success",
      token: token,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const userAccout = await User.findOne({ email: req.body.email });
    if (!userAccout) {
      const err = new Error("Email is not correct!!");
      err.statusCode = 400;
      next(err);
    } else {
      if (!bcrypt.compareSync(req.body.password, userAccout.password)) {
        const err = new Error("Password is not correct!!");
        err.statusCode = 400;
        next(err);
      } else {
        const token = jwt.sign(
          { userId: userAccout._id },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          status: "success",
          data: { token, username: userAccout.username },
        });
      }
    }
  } catch (error) {
    next(err);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const { userId } = req;
    console.log(userId);
    if (userId) {
      const { username, email } = await User.findOne({ _id: userId });
      res.status(200).json({
        username,
        email,
      });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
