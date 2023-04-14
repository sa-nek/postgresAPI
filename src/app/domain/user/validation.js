const joi = require("joi");

const userCreation = joi
  .object()
  .required()
  .keys({
    firstName: joi.string().required().messages({
      "string.base": "First name is invalid",
      "any.required": "First name is required",
    }),
    lastName: joi.string().required().messages({
      "string.base": "Last name is invalid",
      "any.required": "Last name is required",
    }),
    email: joi.string().email().required().messages({
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),
    password: joi
      .string()
      .regex(/^([A-Z]{1,})([a-z]{1,}).{8}$/)
      .required()
      .messages({
        "string.base": "Password is invalid",
        "string.pattern.base": "Password is too easy",
        "any.required": "Password is required",
      }),
  })
  .messages({
    "any.required": "No valid data",
  });

module.exports = { userCreation };
