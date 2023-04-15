const { AuthToken } = require("./store");
const uuid = require("uuid");

const createAuthToken = (userId) => {
  const token = uuid.v4();

  return AuthToken.insertToken({ userId, token });
};

module.exports = { createAuthToken };
