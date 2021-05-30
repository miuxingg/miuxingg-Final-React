const User = require("../../models/User/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.register = async (req, res, next) => {
  try {
    const avatar = "public\\image\\avt.jpg";
    // const body = JSON.parse(req.body.data);
    const { username, password, email } = req.body;
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
          data: {
            token,
            username: userAccout.username,
            isAdmin: userAccout.isAdmin,
          },
        });
      }
    }
  } catch (error) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const avatar = req.file.path;
    const body = JSON.parse(req.body.data);
    let { username, email, password } = body;
    const { userId } = req;
    const userUpdate = await User.findOne({ _id: userId }, function (err, doc) {
      if (err) next(err);
      if (doc.avatar !== "public\\image\\avt.jpg") {
        fs.unlink(`${doc.avatar}`, function (err) {
          if (err) next(err);
        });
      }
      doc.username = username;
      doc.email = email;
      doc.password = password;
      doc.avatar = avatar;
      doc.save(function (err, returnData) {
        if (err) next(err);
        res.status(200).json({
          status: "success",
          data: returnData,
        });
      });
    });

    // const userUpdate = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     avatar,
    //     username,
    //     password,
    //   },
    //   {
    //     // new: true,
    //     runValidators: true,
    //   }
    // );
    // if (userUpdate.avatar !== "Images\\UserImage\\1622197730280.JPG") {
    //   fs.unlink(`${userUpdate.avatar}`, function (err) {
    //     if (err) next(err);
    //   });
    // }
    // res.status(200).json({
    //   status: "success",
    //   data: userUpdate,
    // });
  } catch (error) {
    console.log(error);
    next(error);
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
        password,
        avatar,
      });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
