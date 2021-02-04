import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { DepartmentDto } from 'src/department/dto/department.dto';
import { BaseDto } from 'src/shared/base.entity';

@ObjectType()
export class PositionDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  @Field()
  name: string;

  @ApiProperty({
    type: () => DepartmentDto,
  })
  @AutoMap(() => DepartmentDto)
  @Field(() => DepartmentDto)
  department: DepartmentDto;
}
