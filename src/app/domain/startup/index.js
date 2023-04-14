const { validateConfig } = require("../config");
const { AppServer } = require("../server");
const { logger } = require("../logger");
const { postgres } = require("../db");

class AppStart {
  static async startServices() {
    logger.info("Checking env config");

    validateConfig();

    await postgres.connect();
    await AppServer.start();

    logger.info("OK");
  }
}
module.exports = { AppStart };
