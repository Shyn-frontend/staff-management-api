import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserDepartmentDto } from './user-department.dto';

@ObjectType()
export class UserPositionDto {
  @Field()
  @AutoMap()
  id: string;

  @Field()
  @AutoMap()
  name: string;

  @Field(() => UserDepartmentDto)
  @AutoMap(() => UserDepartmentDto)
  department: UserDepartmentDto;
}
