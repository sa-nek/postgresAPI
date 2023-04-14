const winston = require("winston");

const loggerFormat = (params) => {
  return `${params.timestamp} [${params.level}]: ${params.message}`;
};

const initialiseLogger = () => {
  winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "gray",
  });

  return winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "Postgres-API" },
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.printf(loggerFormat)
        ),
      }),
    ],
  });
};

module.exports = {
  logger: initialiseLogger(),
};
