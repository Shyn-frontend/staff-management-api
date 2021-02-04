import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { DepartmentDto } from 'src/department/dto/department.dto';
import { BaseDto } from 'src/shared/base.entity';

@ObjectType()
export class PositionDto extends BaseDto {
  @AutoMap()
  @Field()
  name: string;

  @AutoMap(() => DepartmentDto)
  @Field(() => DepartmentDto)
  department: DepartmentDto;
}
