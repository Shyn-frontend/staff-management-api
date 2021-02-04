import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
@InputType()
export class CreateDepartmentParamsDto {
  @IsString()
  @Field()
  name: string;

  @IsUUID()
  @Field()
  managerId: string;

  @IsBoolean()
  @Field()
  isBillable: boolean;
}
