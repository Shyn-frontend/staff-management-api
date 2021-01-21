import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResultDto } from './dto/login-result.dto';
import { JwtPayload } from './jwt-strategy.service';
import { mapper } from 'src/shared/mapper/mapper';
import { User } from 'src/entities/user.entity';
import { UserInformationDto } from './dto/user-information.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { RegisterParamsDto } from './dto/register-params.dto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/entities/role.entity';
import { USER_TYPE } from 'src/user/enum/user-type.enum';

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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { email },
      relations: ['position'],
    });

    const isMatchedPassword = this.comparePassword(password, user.password);

    if (user && isMatchedPassword) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<LoginResultDto> {
    const result = new LoginResultDto();
    const accessToken: AccessTokenDto = {
      type: 'Bearer',
      accessToken: this.signIn(user.id),
    };
    const userInfo: UserInformationDto = mapper.map(
      user,
      UserInformationDto,
      User,
    );

    result.token = accessToken;
    result.user = userInfo;

    return result;
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
