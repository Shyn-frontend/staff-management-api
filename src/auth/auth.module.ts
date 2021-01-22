import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { IConfig } from 'src/config.interface';
import { RoleModule } from 'src/role/role.module';
import { CONFIG } from 'src/shared/config/config.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [CONFIG],
      useFactory: (config: IConfig) => ({
        privateKey: config.auth.jwtExpired,
        signOptions: { expiresIn: config.auth.jwtExpired },
      }),
    }),
    UserModule,
    RoleModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
