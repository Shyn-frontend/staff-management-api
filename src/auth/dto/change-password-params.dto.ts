import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class ChangePasswordParamsDto {
  @Field()
  @IsString()
  oldPassword: string;

  @Field()
  @IsString()
  @MaxLength(128)
  newPassword: string;

  @Field()
  @IsString()
  @MaxLength(128)
  confirmPassword: string;
}
