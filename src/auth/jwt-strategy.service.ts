import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfig } from 'src/config.interface';
import { InjectConfig } from 'src/shared/config/config.module';

export interface JwtPayload {
  id: string;
}

export interface AccessToken {
  type: string;
  accessToken: string;
}

export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectConfig() private readonly config: IConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.auth.jwtSecret,
    });
  }
}
