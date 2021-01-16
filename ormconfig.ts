import { ConnectionOptions } from "typeorm";

const ORMConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hell0aA@',
  database: 'staff_management',
  synchronize: false,
  logging: false,
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

module.exports = ORMConfig;
