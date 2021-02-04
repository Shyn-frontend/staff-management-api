import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePositionParamsDto {
  @ApiProperty()
  @IsString()
  @Field()
  name: string;

  @ApiProperty()
  @IsUUID()
  @Field()
  departmentId: string;
}
