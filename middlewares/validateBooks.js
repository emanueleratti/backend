const { body, validationResult } = require("express-validator");

const validateBookBody = [
  body("asin")
    .notEmpty()
    .withMessage("L'asin is necessary")
    .isString()
    .withMessage("The asin must be a string"),
  body("title")
    .notEmpty()
    .withMessage("The title is necessary")
    .isString()
    .withMessage("The title must be a string"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("The image must be a valid URL"),
  body("price")
    .notEmpty()
    .withMessage("The price is necessary")
    .isNumeric()
    .withMessage("The price must be a number"),
  body("category")
    .notEmpty()
    .withMessage("The category is necessary")
    .isString()
    .withMessage("The category must be a string"),
  body("comments")
    .optional()
    .isArray()
    .withMessage("The comments must be an array"),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).send({
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateBookBody;
