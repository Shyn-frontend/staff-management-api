import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export class ManagerDto {
  @ExposedApiProperty()
  name: string;

  @ExposedApiProperty()
  avatar: string;
}