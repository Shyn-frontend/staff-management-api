import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenDto } from './access-token.dto';
import { AuthUserDto } from './auth-user.dto';

export class LoginResultDto {
  @ApiProperty({
    type: () => AuthUserDto,
  })
  user: AuthUserDto;

  @ApiProperty({
    type: () => AccessTokenDto,
  })
  token: AccessTokenDto;
}
