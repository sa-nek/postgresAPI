const dotenv = require("dotenv");
const { logger } = require("../logger");

dotenv.config();

const config = {
  ENV: process.env.ENV,
  EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT, 10),
  SECRET: process.env.SECRET,
  API_URL: process.env.API_URL,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.PORT,
};

const validateConfig = () => {
  const required_vars = [
    "ENV",
    "EXPRESS_PORT",
    "SECRET",
    "API_URL",
    "POSTGRES_DATABASE",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
  ];
  let isMissing = false;
  for (const variable_name of required_vars) {
    if (!process.env[variable_name]) {
      logger.error(`${variable_name} is missing`);
      isMissing = true;
    }
  }
  if (isMissing) {
    process.exit(1);
  }
};

module.exports = { config, validateConfig };
