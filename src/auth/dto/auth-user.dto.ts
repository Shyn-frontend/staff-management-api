import { AutoMap } from '@automapper/classes';
import { UserRoleDto } from 'src/user/dto/user-role.dto';
import { BaseDto } from 'src/shared/base.entity';
import { UserPositionDto } from 'src/user/dto/user-position.dto';
import { USER_TYPE } from 'src/user/enum/user-type.enum';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserDto extends BaseDto {
  @Field({ nullable: true })
  @AutoMap()
  email?: string;

  @Field({ nullable: true })
  @AutoMap()
  name?: string;

  @Field()
  @AutoMap()
  type: USER_TYPE;

  @Field(() => UserPositionDto)
  @AutoMap(() => UserPositionDto)
  position: UserPositionDto;

  @Field(() => UserRoleDto)
  @AutoMap(() => UserRoleDto)
  role: UserRoleDto;

  @Field({ nullable: true })
  @AutoMap()
  avatar?: string;

  @Field()
  @AutoMap()
  isArchived: boolean;

  @Field({ nullable: true })
  permanentLeaveAt?: Date;

  @Field()
  @AutoMap()
  isComplete: boolean;
}
