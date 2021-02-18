import { Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';

@Resolver()
class UserResolver {
  constructor(private userService: UserService);
}

export default UserResolver;
