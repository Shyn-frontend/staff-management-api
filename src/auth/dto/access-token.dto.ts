import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export class AccessTokenDto {
  @ExposedApiProperty()
  type: string;

  @ExposedApiProperty()
  accessToken: string;
}