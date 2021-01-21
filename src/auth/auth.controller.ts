import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { AuthService } from './auth.service';
import { LoginParamsDto } from './dto/login-params.dto';
import { LoginResultDto } from './dto/login-result.dto';
import { RegisterParamsDto } from './dto/register-params.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiErrors()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    type: LoginResultDto,
    description: 'Login successfully',
  })
  async login(
    @Request() req,
    @Body() dto: LoginParamsDto,
  ): Promise<LoginResultDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Register successfully',
  })
  async register(@Body() dto: RegisterParamsDto): Promise<void> {
    return this.authService.register(dto);
  }
}
