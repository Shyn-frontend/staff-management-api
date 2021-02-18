import { Resolver, Query, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Resolver()
// @UseGuards(JwtAuthGuard)
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto)
  getUser(@Args('id') id: string): Promise<UserDto> {
    return this.userService.getUser(id);
  }
}

export default UserResolver;
