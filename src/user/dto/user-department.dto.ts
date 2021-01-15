import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export class UserDepartmentDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiProperty()
  name: string;
}