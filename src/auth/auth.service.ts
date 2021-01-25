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
      // .innerJoinAndSelect('user.position', 'position', )
      // .innerJoinAndSelect('position.department', 'department')
      .innerJoinAndSelect('user.role', 'role')
      .innerJoinAndSelect('role.permissions', 'permission')
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

  async register({ email, password }: RegisterParamsDto) {
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
  }

  private comparePassword(password: string, encrypted: string): boolean {
    return compareSync(password, encrypted);
  }

  private hashPassword(password: string, salt = 10): string {
    return hashSync(password, salt);
  }
}
