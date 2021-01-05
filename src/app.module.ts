import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { IConfig } from './config.interface';
import { CONFIG, ConfigModule } from './shared/config/config.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { PassportGlobalModule } from './shared/passport/passport.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

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
    DepartmentModule,
    PositionModule,
    PassportGlobalModule,
    UserModule,
    RoleModule,
    AuthModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AppModule { }
