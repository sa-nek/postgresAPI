const joi = require("joi");
const { httpError } = require("../errors/httpError");
const validate = (data, schema) => {
  const validationRes = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (validationRes.error) {
    throw new httpError(400, validationRes.error.message);
  }
};

module.exports = { validate };
