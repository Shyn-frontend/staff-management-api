import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginParamsDto {
  @IsEmail()
  @IsString()
  @ApiProperty()
  @AutoMap()
  email: string;

  @IsString()
  @ApiProperty()
  @AutoMap()
  password: string;
}