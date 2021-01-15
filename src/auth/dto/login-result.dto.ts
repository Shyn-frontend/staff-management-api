import { Expose } from "class-transformer";
import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";
import { AccessToken } from "../jwt-strategy.service";
import { UserInformationDto } from "./user-information.dto";

export class LoginResultDto {
  @ExposedApiProperty({
    type: () => UserInformationDto
  })
  user: UserInformationDto;

  @ExposedApiProperty()
  token: AccessToken;
}