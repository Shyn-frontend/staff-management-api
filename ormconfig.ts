import { ConnectionOptions } from 'typeorm';
import ConfigService from './src/shared/config/config.service';
ConfigService.init();

const ORMConfig: ConnectionOptions = {
  name: process.env.DATABASE_NAME,
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  migrations: ['src/migration/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};

module.exports = ORMConfig;