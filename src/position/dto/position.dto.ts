import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { DepartmentDto } from "src/department/dto/department.dto";

export class PositionDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({
    type: () => DepartmentDto
  })
  @AutoMap(() => DepartmentDto)
  department: DepartmentDto;
}