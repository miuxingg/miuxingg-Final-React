const user = require("../../models/User/auth");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  try {
    const avatar = req.file.path;
    const body = JSON.parse(req.body.data);
    const { username, password, email } = body;
    const data = await user.create({ avatar, username, password, email });
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "success",
      token: token,
      data: { username, password, email, avatar },
    });
  } catch (error) {
    res.json(error);
  }
};
