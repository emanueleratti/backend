const genericErrorHandler = (error, request, response, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Ops something went wrong";

  response.status(errorStatus).send({
    statusCode: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
};

module.exports = genericErrorHandler;
