exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  //Duplicate
  if (err.code === 11000) {
    err.statusCode = 400;
    for (let p in err.keyValue) {
      err.message = `${p} have to be unique`;
    }
  }

  //ID sai
  if (err.kind === "ObjectId") {
    err.statusCode = 404;
    err.message = `The ${req.originalUrl} is ot found because of wrong ID`;
  }

  //validate
  if (err.errors) {
    err.statusCode = 400;
    err.message = [];
    for (let p in err.errors) {
      err.message.push(err.errors[p].properties.message);
    }
  }

  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
};
