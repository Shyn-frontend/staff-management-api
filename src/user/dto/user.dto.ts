import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { PositionDto } from 'src/position/dto/position.dto';
import { RoleDto } from 'src/role/dto/role.dto';
import { BaseDto } from 'src/shared/base.entity';
import { USER_TYPE } from '../enum/user-type.enum';
import { UserMetaDto } from './user-meta.dto';

@ObjectType()
export class UserDto extends BaseDto {
  @Field({ nullable: true })
  @AutoMap()
  email?: string;

  @Field({ nullable: true })
  @AutoMap()
  name?: string;

  @Field(() => [UserMetaDto])
  @AutoMap(() => UserMetaDto)
  metas: UserMetaDto[];

  @Field()
  @AutoMap()
  type: USER_TYPE;

  @Field(() => PositionDto)
  @AutoMap(() => PositionDto)
  position: PositionDto;

  @Field(() => RoleDto)
  @AutoMap(() => RoleDto)
  role: RoleDto;

  @Field({ nullable: true })
  @AutoMap()
  avatar?: string;

  @Field()
  @AutoMap()
  isArchived: boolean;

  @Field()
  @AutoMap()
  permanentLeaveAt?: Date;

  @Field()
  @AutoMap()
  isComplete: boolean;

  @Field()
  @AutoMap()
  isPermanent: boolean;
}
