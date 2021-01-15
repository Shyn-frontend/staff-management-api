import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsUUID()
  managerId: string;

  @IsBoolean()
  @IsOptional()
  isBillable: boolean;
}