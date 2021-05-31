const fs = require("fs");
module.exports = (req, res, next) => {
  // save category name and image
  // valid req.body or req.file not get undefined
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    // error
    const err = new Error("Dont found image");
    err.statusCode = 400;
    return next(err);
  }

  let name = req.file.originalname;
  let image = req.file.path;
  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("png") &&
    !req.file.mimetype.includes("jpg")
  ) {
    fs.unlinkSync(image);
    const err = new Error("file not support");
    err.statusCode = 400;
    next(err);
  }

  //check file size max = 3 megabyte (2 megabyte == 1024 * 1024 * 2)
  if (req.file.size > 1024 * 1024 * 30) {
    fs.unlinkSync(image);
    const err = new Error("File size is too large");
    err.statusCode = 400;
    next(err);
  }

  if (!name || !image) {
    const err = new Error("All file is must require");
    err.statusCode = 400;
    next(err);
  }

  next();
};
