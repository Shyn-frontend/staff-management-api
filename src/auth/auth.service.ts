import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResultDto } from './dto/login-result.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { mapper } from 'src/shared/mapper/mapper';
import { User } from 'src/entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterParamsDto } from './dto/register-params.dto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/entities/role.entity';
import { USER_TYPE } from 'src/user/enum/user-type.enum';
import { LoginParamsDto } from './dto/login-params.dto';
import { getManager } from 'typeorm';
import { ChangePasswordParamsDto } from './dto/change-password-params.dto';
import { CompleteProfileParamsDto } from './dto/complete-profile-params.dto';

interface ICompleteProfile {
  password: string;
  isComplete: true;
  name?: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  signPayload(payload: { [key: string]: any }): string {
    return this.jwtService.sign(payload);
  }

  signIn(id: string): string {
    const payload: JwtPayload = { id };
    return this.signPayload(payload);
  }

  async validateUser({ id }: JwtPayload): Promise<AuthUserDto> {
    const user = await this.userService.findOne({
      where: { id },
      relations: ['position'],
    });

    return mapper.map(user, AuthUserDto, User);
  }

  createLoginResult(user: User) {
    const result = new LoginResultDto();

    result.user = mapper.map(user, AuthUserDto, User);
    result.token = {
      type: 'Bearer',
      accessToken: this.signIn(user.id),
    };

    return result;
  }

  async login({ email, password }: LoginParamsDto): Promise<LoginResultDto> {
    const user = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .getOne();

    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    const isMatchedPassword = this.comparePassword(password, user.password);
    if (!isMatchedPassword) {
      throw new BadRequestException('Wrong credentials');
    }

    const loginResult = this.createLoginResult(user);
    return loginResult;
  }

  async register({ email, password }: RegisterParamsDto): Promise<string> {
    const isExistedEmail = await this.userService.findOne({ email });
    if (isExistedEmail) {
      throw new BadRequestException('existed_email');
    }

    const employeeRole: Role = await this.roleService.findOne({
      name: USER_TYPE.EMPLOYEE,
    });
    if (!employeeRole) {
      throw new InternalServerErrorException('not_found_employee_role');
    }

    const hashedPassword = this.hashPassword(password);
    const employee: User = this.userService.createRepo({
      email,
      password: hashedPassword,
      roleId: employeeRole.id,
      isComplete: true,
    });

    await this.userService.create(employee);
    return 'Register successfully!';
  }

  async changePassword(
    dto: ChangePasswordParamsDto,
    reqUser: AuthUserDto,
  ): Promise<string> {
    const { oldPassword, newPassword, confirmPassword } = dto;
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('confirm_password_is_not_matched');
    }

    const user = await this.userService.findById(reqUser.id);
    const isMatchedOldPassword = await this.comparePassword(
      oldPassword,
      user.password,
    );
    if (!isMatchedOldPassword) {
      throw new BadRequestException('password_is_not_matched');
    }

    const hashedNewPassword = this.hashPassword(newPassword);
    await this.userService.update(
      { id: user.id },
      { password: hashedNewPassword },
    );

    return 'Change password successfully!';
  }

  async completeProfile(
    dto: CompleteProfileParamsDto,
  ): Promise<LoginResultDto> {
    const { email, name, password } = dto;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException('not_found_user');
    }

    const data: ICompleteProfile = {
      password: this.hashPassword(password),
      isComplete: true,
    };

    if (name) {
      data.name = name;
    }

    await this.userService.update({ email }, data);
    if (name) user.name = name;

    return this.createLoginResult(user);
  }
  private comparePassword(password: string, encrypted: string): boolean {
    return compareSync(password, encrypted);
  }

  private hashPassword(password: string, salt = 10): string {
    return hashSync(password, salt);
  }
}
