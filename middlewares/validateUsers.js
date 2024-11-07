const { body, validationResult } = require("express-validator");

const validateUserBody = [
  body("name")
    .notEmpty()
    .withMessage("The name is necessary")
    .isString()
    .withMessage("The name must be a string"),
  body("surname")
    .notEmpty()
    .withMessage("The surname is necessary")
    .isString()
    .withMessage("The surname must be a string"),
  body("email")
    .notEmpty()
    .withMessage("The email is necessary")
    .isEmail()
    .withMessage("Insert a valid email"),
  body("password")
    .notEmpty()
    .withMessage("The password is necessary")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long"),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).send({
        errors: error.array(),
      });
    }
    next();
  },
];

module.exports = validateUserBody;
