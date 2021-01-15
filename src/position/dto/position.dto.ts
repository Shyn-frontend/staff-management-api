import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export class PositionDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiProperty()
  name: string;
}