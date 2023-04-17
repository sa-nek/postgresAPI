const { Router } = require("express");
const { validate } = require("../utils/validation");
const { userCreation, userAuthentication } = require("./validation");
const { UserHandler } = require("./handler");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { editUser } = require("./editor");

class UserRouter {
  router;
  constructor() {
    this.router = Router();

    this.router.post("/users", asyncWrapper(this.createUser));
    this.router.post("/users/auth", asyncWrapper(this.authUser));
  }
  get() {
    return this.router;
  }
  async createUser(req, res) {
    validate(req.body, userCreation);

    const { user, token } = await UserHandler.createUser(req);

    res.json({ user: editUser(user), token });
  }

  async authUser(req, res) {
    validate(req.body, userAuthentication);

    const { user, token } = await UserHandler.authUser(req);

    res.json({ user: editUser(user), token });
  }
}
module.exports = { userRouter: new UserRouter().get() };
