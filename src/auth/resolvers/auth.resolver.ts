import { Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthService } from '../auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { ChangePasswordParamsDto } from '../dto/change-password-params.dto';
import { CompleteProfileParamsDto } from '../dto/complete-profile-params.dto';
import { LoginParamsDto } from '../dto/login-params.dto';
import { LoginResultDto } from '../dto/login-result.dto';
import { RegisterParamsDto } from '../dto/register-params.dto';

class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResultDto)
  async login(@Args('login') dto: LoginParamsDto): Promise<LoginResultDto> {
    return this.authService.login(dto);
  }

  @Mutation(() => String)
  async register(@Args('register') dto: RegisterParamsDto): Promise<string> {
    return this.authService.register(dto);
  }

  @Mutation(() => String)
  async changePassword(
    @Args('changePassword') dto: ChangePasswordParamsDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<string> {
    return this.authService.changePassword(dto, user);
  }

  @Mutation(() => LoginResultDto)
  async completeProfile(
    @Args('completeProfile') dto: CompleteProfileParamsDto,
  ): Promise<LoginResultDto> {
    return this.authService.completeProfile(dto);
  }
}

export default AuthResolver;
