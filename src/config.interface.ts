import { Environment } from './shared/config/config.module';

export interface IConfig {
  app: {
    host: string;
    port: string | number;
    domain: string;
    env: Environment;
    isSwaggerEnabled: boolean;
  };

  mysql: {
    type: string;
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    synchronize: boolean;
  };

  auth: {
    jwtSecret: string;
    jwtExpired: string;
    salt: number;
  };
}
