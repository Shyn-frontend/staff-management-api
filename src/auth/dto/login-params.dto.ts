import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginParamsDto {
  @IsEmail()
  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
