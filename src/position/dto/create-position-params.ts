import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePositionParamsDto {
  @IsString()
  @Field()
  name: string;

  @IsUUID()
  @Field()
  departmentId: string;
}
