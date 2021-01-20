import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/shared/base.entity";
import { ManagerDto } from "src/user/dto/manager.dto";

export class DepartmentDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  name: string;
  
  @ApiProperty()
  @AutoMap()
  isBillable: boolean;

  @ApiProperty()
  @AutoMap(() => ManagerDto)
  manager: ManagerDto;
}