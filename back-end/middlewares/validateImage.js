const fs = require("fs");
module.exports = (req, res, next) => {
  // save category name and image
  // valid req.body or req.file not get undefined
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    // error
    return res.status(400).json({
      status: "Dont found image",
    });
  }

  let name = req.file.originalname;
  let image = req.file.path;
  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("png") &&
    !req.file.mimetype.includes("jpg")
  ) {
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: "file not support",
    });
  }

  //check file size max = 3 megabyte (2 megabyte == 1024 * 1024 * 2)
  if (req.file.size > 1024 * 1024 * 3) {
    fs.unlinkSync(image);
    return res.status(400).json({
      status: "File size is too large",
    });
  }

  if (!name || !image) {
    return res.status(400).json({
      status: "All file is mus require",
    });
  }

  next();
};
