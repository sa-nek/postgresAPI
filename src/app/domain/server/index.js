const express = require("express");
const cors = require("cors");
const { config } = require("../config");
const { logger } = require("../logger");
const { responseErrors } = require("../middleware/responeErrors");
const { userRouter } = require("../user/routes");

class App {
  port = config.EXPRESS_PORT;

  start() {
    return new Promise((resolve) => {
      const app = express();

      app.use(cors());
      app.use(express.json());

      app.use("/", userRouter);

      app.use(responseErrors);

      app.listen(this.port, () => {
        logger.info(`Server is running on port ${this.port}`);

        resolve();
      });
    });
  }
}

module.exports = { AppServer: new App() };
