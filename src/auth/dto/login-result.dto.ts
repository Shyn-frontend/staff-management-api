import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { AccessTokenDto } from "./access-token.dto";
import { UserInformationDto } from "./user-information.dto";

export class LoginResultDto {
  @ApiProperty({
    type: () => UserInformationDto
  })
  @AutoMap(() => UserInformationDto)
  user: UserInformationDto;

  @ApiProperty({
    type: () => AccessTokenDto
  })
  @AutoMap(() => AccessTokenDto)
  token: AccessTokenDto;
}