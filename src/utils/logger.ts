import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

class Logger {
  public logger: winston.Logger;
  constructor(run_mode: string) {
    if (run_mode === "prod") {
      this.logger = this.GetProdLogger();
    } else if (run_mode === "prod_debug") {
      this.logger = this.GetProdDebugLogger();
    } else {
      this.logger = this.GetDevLogger();
    }
  }
  private GetDevLogger(): winston.Logger {
    let option = <winston.LoggerOptions>{
      level: "silly",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.prettyPrint(),
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf(({ level, message, timestamp, service }) => {
          return `[${service}] [${timestamp}] ${level}: ${message}`;
        })
      ),
      defaultMeta: { service: "vpp-chain-client" },
      transports: [new winston.transports.Console()],
    };
    return winston.createLogger(option);
  }
  private GetProdLogger(): winston.Logger {
    let option = <winston.LoggerOptions>{
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.splat()
      ),
      defaultMeta: { service: "vpp-chain-client" },
      transports: [
        new DailyRotateFile({
          filename: "error-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
          dirname: "log",
          level: "error",
        }),
        new DailyRotateFile({
          filename: "all-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
          dirname: "log",
          level: "info",
        }),
      ],
    };
    return winston.createLogger(option);
  }
  private GetProdDebugLogger(): winston.Logger {
    let option = <winston.LoggerOptions>{
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.splat()
      ),
      defaultMeta: { service: "vpp-chain-client" },
      transports: [
        new DailyRotateFile({
          filename: "debug-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxFiles: "30d",
          dirname: "log",
          level: "debug",
        }),
      ],
    };
    return winston.createLogger(option);
  }
}

export { Logger };
