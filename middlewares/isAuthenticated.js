const jwt = require("jsonwebtoken");

const isAuthenticated = (request, response, next) => {
  const token = request.header("isAuth");
  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    response.status(400).json({ message: "Invalid token." });
  }
};

module.exports = isAuthenticated;
