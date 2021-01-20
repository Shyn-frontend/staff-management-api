import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { AuthService } from './auth.service';
import { LoginParamsDto } from './dto/login-params.dto';
import { LoginResultDto } from './dto/login-result.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOkResponse({
    type: LoginResultDto,
    description: 'Login successfully',
  })
  @ApiErrors()
  async login(@Body() params: LoginParamsDto): Promise<LoginResultDto> {
    return this.authService.login(params);
  }
}
