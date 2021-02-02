import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
@InputType()
export class CreateDepartmentParamsDto {
  @IsString()
  @ApiProperty()
  @Field()
  name: string;

  @IsUUID()
  @ApiProperty()
  @Field()
  managerId: string;

  @IsBoolean()
  @ApiProperty()
  @Field()
  isBillable: boolean;
}
