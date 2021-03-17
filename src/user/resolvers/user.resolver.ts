import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UpdateUserParamsDto } from '../dto/update-user-params.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Resolver()
@UseGuards(JwtAuthGuard)
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @Mutation(() => UserDto)
  async updateUserLogged(
    @Args('data') dto: UpdateUserParamsDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUserLogged(dto, user);
  }
}

export default UserResolver;
