import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export interface TokenDto {
  type: string;

  accessToken: string;
}