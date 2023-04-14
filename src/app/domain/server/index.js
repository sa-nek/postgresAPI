const express = require("express");
const cors = require("cors");
const { config } = require("../config");
const { logger } = require("../logger");

class App {
  port = config.EXPRESS_PORT;

  start() {
    return new Promise((resolve) => {
      const app = express();

      app.use(cors());
      app.use(express.json());

      app.listen(this.port, () => {
        logger.info(`Server is running on port ${this.port}`);

        resolve();
      });
    });
  }
}

module.exports = { AppServer: new App() };
