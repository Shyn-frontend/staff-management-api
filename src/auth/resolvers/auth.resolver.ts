import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginParamsDto } from '../dto/login-params.dto';
import { LoginResultDto } from '../dto/login-result.dto';
// import { RegisterParamsDto } from '../dto/register-params.dto';

class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResultDto)
  async login(@Args('loginData') dto: LoginParamsDto): Promise<LoginResultDto> {
    return this.authService.login(dto);
  }

  // @Mutation(() => LoginParamsDto)
  // async register(@Args('register') dto: RegisterParamsDto): Promise<void> {
  //   return this.authService.register(dto);
  // }
}

export default AuthResolver;
