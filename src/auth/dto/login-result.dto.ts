import { Field, ObjectType } from '@nestjs/graphql';
import { AccessTokenDto } from './access-token.dto';
import { AuthUserDto } from './auth-user.dto';

@ObjectType()
export class LoginResultDto {
  @Field(() => AuthUserDto)
  user: AuthUserDto;

  @Field(() => AccessTokenDto)
  token: AccessTokenDto;
}
