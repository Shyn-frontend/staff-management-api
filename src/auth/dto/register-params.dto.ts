import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RegisterParamsDto {
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Field()
  password: string;
}
