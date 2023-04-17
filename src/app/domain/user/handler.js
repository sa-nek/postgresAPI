const { User } = require("./store");
const { httpError } = require("../errors/httpError");
const { hashSync, compareSync } = require("bcryptjs");
const { createAuthToken } = require("../auth/generate");
class UserHandler {
  static async createUser(req) {
    if (await User.getUserByEmail(req.body.email)) {
      throw new httpError(400, "User already exists");
    }

    const { firstName, lastName, email, password } = req.body;
    const userData = { firstName, lastName, email };
    userData.password = hashSync(password);

    const user = await User.InsertUser(userData);

    const tokenResponse = await createAuthToken(user.id);

    return { user, token: tokenResponse.token };
  }

  static async authUser(req) {
    const user = await User.getUserByEmail(req.body.email);

    if (!user) throw new httpError(400, "Invalid auth data");

    if (!compareSync(req.body.password, user.password)) {
      throw new httpError(400, "Invalid auth data");
    }

    const authToken = await createAuthToken(user.id);

    return { token: authToken.token, user };
  }
}

module.exports = {
  UserHandler,
};
