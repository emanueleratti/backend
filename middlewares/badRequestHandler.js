const badRequestHandler = (error, request, response, next) => {
  if (error.status === 400) {
    response.status(400).send({
      message: error.message || "Bad Request",
    });
  } else {
    next(error);
  }
};

module.exports = badRequestHandler;
