import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { DepartmentDto } from "src/department/dto/department.dto";
import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export class PositionDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap(() => DepartmentDto)
  department: DepartmentDto;
}