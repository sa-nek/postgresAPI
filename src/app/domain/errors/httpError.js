class httpError extends Error {
  statusCode;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = { httpError };
