import { Environment } from "./shared/config/config.module";

export interface IConfig {
  app: {
    host: string,
    port: string | number,
    domain: string;
    env: Environment,
    isSwaggerEnabled: boolean;
  };
}