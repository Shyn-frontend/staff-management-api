import { IConfig } from "./config.interface";
import { Environment } from "./shared/config/config.module";

class Config implements IConfig {
  constructor() {
    this.app = {
      host: 'localhost',
      port: process.env.PORT || 3000,
      domain: `http://localhost:${process.env.PORT}`,
      env: 'development',
      isSwaggerEnabled: Boolean(process.env.IS_SWAGGER_ENABLED),
    };

    this.mysql = {
      type: 'mysql',
      host: process.env.HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: false
    };

    this.auth = {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpired: '24h',
      salt: 10,
    }
  }

  app: {
    host: string;
    port: string | number;
    domain: string,
    env: Environment;
    isSwaggerEnabled: boolean;
  };

  mysql: {
    type: string,
    host: string,
    port: string | number,
    username: string,
    password: string,
    database: string,
    entities: string[],
    synchronize: boolean,
  };

  auth: {
    jwtSecret: string,
    jwtExpired: string,
    salt: number,
  }
}

export default new Config();