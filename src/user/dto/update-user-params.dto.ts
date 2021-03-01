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
  @Field({ nullable: true })
  name?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @Field({ nullable: true })
  avatar?: string;

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  positionId?: string;

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  roleId?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isPermanent?: boolean;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  employeeNo?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  contractStart?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  contractEnd?: string;
}
