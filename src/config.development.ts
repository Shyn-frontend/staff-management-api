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
  }

  app: {
    host: string;
    port: string | number;
    domain: string,
    env: Environment;
    isSwaggerEnabled: boolean;
  };
}

export default new Config();