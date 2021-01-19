import { IsBoolean, IsString, IsUUID } from "class-validator";
import { ExposedApiProperty, ExposedApiPropertyOptional } from "src/shared/decorators/exposed-api-model-property.decorator";
export class CreateDepartmentDto {
  @IsString()
  @ExposedApiProperty()
  name: string;

  @IsUUID()
  @ExposedApiPropertyOptional()
  managerId: string;

  @IsBoolean()
  @ExposedApiProperty()
  isBillable: boolean;
}