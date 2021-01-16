import { BadRequestException, Body, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResultDto } from './dto/login-result.dto';
import { LoginParamsDto } from './dto/login-params.dto';
import { JwtPayload } from './jwt-strategy.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  signPayload(payload: { [key: string]: any; }): string {
    return this.jwtService.sign(payload);
  }

  signIn(id: string): string {
    const payload: JwtPayload = { id };
    return this.signPayload(payload);
  }

  async login(@Body() params: LoginParamsDto): Promise<LoginResultDto> {
    const { email, password } = params;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException('wrong_credentials');
    }

    const isMatchedPassword = this.comparePassword(password, user.password);
    if (!isMatchedPassword) {
      throw new BadRequestException('wrong_credentials');
    }

    const result = new LoginResultDto();
    const token = this.signIn(user.id);
    result.token = { type: 'Bearer', accessToken: token };

    return result;
  }

  private comparePassword(password: string, encrypted: string): boolean {
    return compareSync(password, encrypted);
  }
}
