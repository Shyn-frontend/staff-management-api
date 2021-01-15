import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";
import { UserDepartmentDto } from "./user-department.dto";

export class UserPositionDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiProperty()
  name: string;

  @ExposedApiProperty({
    type: () => UserDepartmentDto
  })
  department: UserDepartmentDto;
}