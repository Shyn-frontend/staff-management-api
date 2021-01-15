import { ExposedApiProperty } from "src/shared/decorators/exposed-api-model-property.decorator";

export class UserRoleDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiProperty()
  name: string;

  @ExposedApiProperty({
    type: () => UserRoleDto
  })
  role: UserRoleDto;
}