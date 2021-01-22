import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfig } from 'src/config.interface';
import { InjectConfig } from 'src/shared/config/config.module';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

export interface JwtPayload {
  id: string;
}

export interface AccessToken {
  type: string;
  accessToken: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectConfig() private readonly config: IConfig,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUserDto> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
