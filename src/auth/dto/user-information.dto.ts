import { UserRoleDto } from "src/role/dto/user-role.dto";
import { BaseDto } from "src/shared/base.entity";
import { ExposedApiProperty, ExposedApiPropertyOptional } from "src/shared/decorators/exposed-api-model-property.decorator";
import getEnum from "src/shared/utils/getEnum";
import { UserPositionDto } from "src/user/dto/user-position.dto";
import { USER_TYPE } from "src/user/enum/user-type.enum";

export class UserInformationDto extends BaseDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiProperty()
  email: string;

  @ExposedApiProperty()
  name: string;

  @ExposedApiProperty({ enum: getEnum(USER_TYPE) })
  type: USER_TYPE;

  @ExposedApiProperty({
    type: () => UserPositionDto
  })
  position: UserPositionDto;

  @ExposedApiProperty({
    type: () => UserRoleDto
  })
  role: UserRoleDto;

  @ExposedApiPropertyOptional()
  avatar?: string;

  @ExposedApiProperty()
  isArchived: boolean;

  @ExposedApiPropertyOptional()
  permanentLeaveAt?: Date;

  @ExposedApiProperty()
  isComplete: boolean;
}