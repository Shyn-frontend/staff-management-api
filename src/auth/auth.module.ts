import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IConfig } from 'src/config.interface';
import { CONFIG } from 'src/shared/config/config.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [CONFIG],
      useFactory: (config: IConfig) => ({
        privateKey: config.auth.jwtExpired,
        signOptions: { expiresIn: config.auth.jwtExpired }
      })
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService],
})
export class AuthModule { }
