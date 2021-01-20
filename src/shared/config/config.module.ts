import {
  DynamicModule,
  Global,
  Inject,
  Module,
  Provider,
} from '@nestjs/common';
import { resolve } from 'path';

export const CONFIG = '@@appConfig';
export const InjectConfig = () => Inject(CONFIG);
export type Environment = 'development' | 'staging' | 'production';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(environment: Environment = 'development'): DynamicModule {
    const configProviders = this.createProviders(environment);
    return {
      module: ConfigModule,
      providers: configProviders,
      exports: configProviders,
    };
  }

  private static createProviders(environment: Environment): Provider[] {
    const config = require(resolve(
      __dirname,
      '../../',
      `config.${environment}`,
    ));

    return [{ provide: CONFIG, useValue: config.default }];
  }
}
