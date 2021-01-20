import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenDto } from './access-token.dto';
import { UserInformationDto } from './user-information.dto';

export class LoginResultDto {
  @ApiProperty({
    type: () => UserInformationDto,
  })
  user: UserInformationDto;

  @ApiProperty({
    type: () => AccessTokenDto,
  })
  token: AccessTokenDto;
}
