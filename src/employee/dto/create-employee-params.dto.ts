import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateEmployeeParamsDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  avatar?: string;

  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsUUID()
  @Field()
  positionId: string;

  @IsUUID()
  @Field()
  roleId: string;

  @IsOptional()
  @Field({ nullable: true })
  weeklyHours?: number;

  @IsBoolean()
  @Field()
  isPermanent: boolean;

  @IsString()
  @Field()
  employeeNo: string;

  @IsNumber()
  @Field()
  hourlyRate?: number;

  @IsOptional()
  @Field({ nullable: true })
  contractStart?: string;

  @IsOptional()
  @Field({ nullable: true })
  contractEnd?: string;
}
