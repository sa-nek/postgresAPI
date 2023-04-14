const { User } = require("./store");
const { httpError } = require("../errors/httpError");
const { hashSync } = require("bcryptjs");
class UserHandler {
  static async createUser(req) {
    if (await User.getUserByEmail(req.body.email)) {
      throw new httpError(400, "User already exists");
    }

    const { firstName, lastName, email, password } = req.body;
    const userData = { firstName, lastName, email };
    userData.password = hashSync(password);

    const user = await User.InsertUser(userData);
    return user;
  }
}

module.exports = {
  UserHandler,
};
