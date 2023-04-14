const { error } = require("winston");
const { httpError } = require("../errors/httpError");
const { logger } = require("../logger/index");

const responseErrors = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);

  if (err instanceof httpError) {
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).send("Strange error");
};
module.exports = { responseErrors };
