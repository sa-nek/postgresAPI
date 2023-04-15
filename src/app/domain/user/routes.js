const { Router } = require("express");
const { validate } = require("../utils/validation");
const { userCreation } = require("./validation");
const { UserHandler } = require("./handler");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { editUser } = require("./editor");

class UserRouter {
  router;
  constructor() {
    this.router = Router();

    this.router.post("/users", asyncWrapper(this.createUser));
  }
  get() {
    return this.router;
  }
  async createUser(req, res) {
    validate(req.body, userCreation);

    const user = await UserHandler.createUser(req);
    res.json(editUser(user));
  }
}
module.exports = { userRouter: new UserRouter().get() };
