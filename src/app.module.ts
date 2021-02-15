import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { IConfig } from './config.interface';
import { CONFIG, ConfigModule } from './shared/config/config.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { PassportGlobalModule } from './shared/passport/passport.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (config: IConfig) =>
        ({
          type: config.mysql.type,
          host: config.mysql.host,
          port: config.mysql.port,
          username: config.mysql.username,
          password: config.mysql.password,
          database: config.mysql.database,
          entities: config.mysql.entities,
          synchronize: config.mysql.synchronize,
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    DepartmentModule,
    PositionModule,
    PassportGlobalModule,
    UserModule,
    RoleModule,
    AuthModule,
    PermissionModule,
  ],
})
export class AppModule {}
