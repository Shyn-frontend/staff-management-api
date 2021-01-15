import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginParamsDto } from './dto/login-params.dto';
import { LoginResultDto } from './dto/login-result.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  async login(@Body() params: LoginParamsDto): Promise<LoginResultDto> {
    return this.authService.login(params);
  }
}
