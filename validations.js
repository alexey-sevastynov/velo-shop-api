const { body } = require("express-validator");

const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
];

const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];
const postCreateValidation = [
  body("fullName").isLength({ min: 3 }).isString(),
  body("manufacturer").isLength({ min: 3 }).isString(),
  body("article").optional().isString(),
  body("image").optional().isString(),
  body("availability").isBoolean(),
  body("price").isLength({ min: 3 }),
  body("size").isString(),
  body("color").isString(),
  body("description").isString(),
  body("year").isLength({ min: 4 }),
  body("diameter"),
  body("material"),
  body("tires"),
  body("frame"),
  body("saddle"),
  body("seatpost"),
  body("fork"),
  body("chain"),
  body("brake"),
  body("speed"),
  body("garantine"),
];

module.exports = { registerValidation, loginValidation, postCreateValidation };
