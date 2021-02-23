import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateUserParamsDto {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  avatar?: string;

  @IsUUID()
  @IsOptional()
  positionId?: string;

  @IsUUID()
  @IsOptional()
  roleId?: string;

  @IsBoolean()
  @IsOptional()
  isPermanent?: boolean;

  @IsString()
  @IsOptional()
  employeeNo?: string;

  @IsString()
  @IsOptional()
  contractStart?: string;

  @IsString()
  @IsOptional()
  contractEnd?: string;
}
