import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CompleteProfileParamsDto {
  @Field()
  @IsString()
  @MaxLength(128)
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(128)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
