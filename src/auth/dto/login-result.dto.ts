import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";
import { AccessTokenDto } from "./access-token.dto";
import { UserInformationDto } from "./user-information.dto";

export class LoginResultDto {
  @ExposedApiProperty({
    type: () => UserInformationDto
  })
  user: UserInformationDto;

  @ExposedApiProperty({
    type: () => AccessTokenDto
  })
  token: AccessTokenDto;
}