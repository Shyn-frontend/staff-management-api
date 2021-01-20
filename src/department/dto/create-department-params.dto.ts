import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";
export class CreateDepartmentParamsDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty()
  managerId: string;

  @IsBoolean()
  @ApiProperty()
  isBillable: boolean;
}