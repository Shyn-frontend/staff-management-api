import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";
import { ManagerDto } from "src/user/dto/manager.dto";

export class DepartmentDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiProperty()
  name: string;

  @ExposedApiProperty({
    type: () => ManagerDto,
  })
  manager: ManagerDto;

  @ExposedApiProperty()
  isBillable: boolean
}