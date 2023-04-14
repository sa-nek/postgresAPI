const { config } = require("../config");
const { Client } = require("pg");
const { logger } = require("../logger");

class DB {
  client;
  isConnected = false;
  constructor() {
    this.client = new Client({
      host: config.POSTGRES_HOST,
      port: config.POSTGRES_PORT,
      user: config.POSTGRES_USER,
      database: config.POSTGRES_DATABASE,
      password: config.POSTGRES_PASSWORD,
    });
  }
  async connect() {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      logger.info("DB is connected");
    }
  }
  async close() {
    if (this.isConnected) {
      await this.client.end();
      this.isConnected = false;
      logger.info("DB is disconnected");
    }
  }
}

module.exports = {
  postgres: new DB(),
};
