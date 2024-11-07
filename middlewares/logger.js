const logger = (request, response, next) => {
  const { url, ip, method } = request;
  console.log(
    `[${new Date().toDateString()}] Requested ${method} to ${url} with ip ${ip}`
  );
  next();
};

module.exports = logger;
