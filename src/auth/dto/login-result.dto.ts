import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";
import { AccessTokenDto } from "./access-token.dto";
import { UserInformationDto } from "./user-information.dto";

export class LoginResultDto {
  @ApiProperty({
    type: () => UserInformationDto
  })
  @AutoMap(() => UserInformationDto)
  user: UserInformationDto;

  @ExposedApiProperty({
    type: () => AccessTokenDto
  })
  @ApiProperty({
    type: () => AccessTokenDto
  })
  @AutoMap(() => AccessTokenDto)
  token: AccessTokenDto;
}