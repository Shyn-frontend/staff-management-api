import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
@InputType()
export class UpdateUserParamsDto {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  @Field()
  name?: string;

  @IsEmail()
  @IsOptional()
  @Field()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @Field()
  avatar?: string;

  @IsUUID()
  @IsOptional()
  @Field()
  positionId?: string;

  @IsUUID()
  @IsOptional()
  @Field()
  roleId?: string;

  @IsBoolean()
  @IsOptional()
  @Field()
  isPermanent?: boolean;

  @IsString()
  @IsOptional()
  @Field()
  employeeNo?: string;

  @IsString()
  @IsOptional()
  @Field()
  contractStart?: string;

  @IsString()
  @IsOptional()
  @Field()
  contractEnd?: string;
}
