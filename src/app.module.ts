import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from 'rxjs';
import { IConfig } from './config.interface';
import { CONFIG, ConfigModule } from './shared/config/config.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (config: IConfig) => ({
        type: config.mysql.type,
        host: config.mysql.host,
        port: config.mysql.port,
        username: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database,
        entities: config.mysql.entities,
        synchronize: config.mysql.synchronize,
        autoLoadEntities: true,
      }) as TypeOrmModuleAsyncOptions
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule { }
