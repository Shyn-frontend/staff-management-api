import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserDepartmentDto } from "./user-department.dto";

export class UserPositionDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({
    type: () => UserDepartmentDto
  })
  @AutoMap(() => UserDepartmentDto)
  department: UserDepartmentDto;
}