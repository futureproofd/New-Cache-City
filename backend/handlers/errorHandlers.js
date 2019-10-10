exports.notFound = (req, res, next) => {
  const err = new Error('Not found!');
  err.status = 404;
  next(err);
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {},
  });
};
