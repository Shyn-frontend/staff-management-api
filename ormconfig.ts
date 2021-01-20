import ConfigService from './src/shared/config/config.service';
ConfigService.init();

const ORMConfig = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  migrations: ['src/migrations/*.ts'],
  factories: ['src/factories/*.ts'],
  entities: ['src/entities/*.entity.ts'],
  seeds: ['src/seeds/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

module.exports = ORMConfig;
