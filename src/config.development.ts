import { IConfig } from "./config.interface";
import { Environment } from "./shared/config/config.module";

class Config implements IConfig {
  constructor() {
    this.app = {
      host: 'localhost',
      port: 3001,
      domain: 'http://localhost:3001',
      env: 'development',
      isSwaggerEnabled: true,
    };

    this.mysql = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hell0aA@',
      database: 'baseline_clone',
      entities: [],
      synchronize: true
    };

    this.auth = {
      jwtSecret: 'superSecret',
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