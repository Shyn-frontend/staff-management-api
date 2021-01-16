import { ConnectionOptions } from 'typeorm';
import ConfigService from './src/shared/config/config.service';
ConfigService.init();
import * as path from 'path'

const ORMConfig: ConnectionOptions = {
  name: process.env.DATABASE_NAME,
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  logger: 'file',
  entities: ["entity/*.js"],
  migrations: ['./src/migration/*.js'],
  cli: {
    'migrationsDir': path.resolve('./src/migrations')
  }
};

module.exports = ORMConfig;