import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserParamsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
