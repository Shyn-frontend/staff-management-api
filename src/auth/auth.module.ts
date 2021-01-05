import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IConfig } from 'src/config.interface';
import { CONFIG } from 'src/shared/config/config.module';
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
    })
  ],
  providers: [AuthService, JwtStrategyService]
})
export class AuthModule { }
