import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { pick, omit } from 'lodash';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { UserMeta, USER_META_FIELDS } from 'src/entities/user-meta.entity';
import { PositionService } from 'src/position/position.service';
import { RoleService } from 'src/role/role.service';
import { BaseService } from 'src/shared/base.service';
import { mapper } from 'src/shared/mapper/mapper';
import { getManager, Repository } from 'typeorm';
import { NormalizeUser, User } from '../entities/user.entity';
import { NormalizeUserDto } from './dto/normalize-user-dto';
import { UpdateUserParamsDto } from './dto/update-user-params.dto';
import { UserDto } from './dto/user.dto';
import { UserMetaService } from '../user-meta/user-meta.service';

interface ContractTime {
  start: string;
  end: string;
}

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userMetaService: UserMetaService,
    private readonly positionService: PositionService,
    private readonly roleService: RoleService,
  ) {
    super();
    this.repository = userRepository;
  }

  standardContractTime = ({ start, end }: ContractTime): ContractTime => {
    if (moment(start).startOf('day').isAfter(moment(end).endOf('day'))) {
      throw new BadRequestException('invalid_contract_time');
    }

    const contractStart = moment(start).startOf('day').format('YYYY-MM-DD');

    const contractEnd = moment(end).endOf('day').format('YYYY-MM-DD');

    if (!moment(contractStart).isValid() || !moment(contractEnd).isValid()) {
      throw new BadRequestException('invalid_date');
    }

    return { start: contractStart, end: contractEnd };
  };
  async getUser(id: string): Promise<UserDto> {
    const user = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .leftJoinAndSelect('user.metas', 'meta')
      .getOne();
    if (!user) {
      throw new BadRequestException('not_found_user');
    }
    return mapper.map(user, UserDto, User);
  }

  async updateUserLogged(
    dto: UpdateUserParamsDto,
    userLogged: AuthUserDto,
  ): Promise<UserDto> {
    let { contractStart, contractEnd } = dto;
    const EMPLOYEE_META_FIELDS = [
      USER_META_FIELDS.EMPLOYEE_NO,
      USER_META_FIELDS.HOURLY_RATE,
      USER_META_FIELDS.WEEKLY_HOURS,
    ];

    const user: User = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.id = :id', { id: userLogged.id })
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .getOne();

    if (dto.roleId) {
      const role = await this.roleService.findById(dto.roleId);
      if (!role) {
        throw new BadRequestException('not_found_role');
      }
    }

    if (dto.positionId) {
      const position = await this.positionService.findById(dto.positionId);
      if (!position) {
        throw new BadRequestException('not_found_position');
      }
    }

    if (dto.email && dto.email !== userLogged.email) {
      const isExistedEmail = await this.findOne({ email: dto.email });
      if (isExistedEmail) {
        throw new BadRequestException('email_already_existed');
      }
    }

    if (dto.employeeNo) {
      const isExistedEmployeeNo = await this.userMetaService.findOne({
        key: USER_META_FIELDS.EMPLOYEE_NO,
        value: dto.employeeNo,
      });

      if (isExistedEmployeeNo) {
        throw new BadRequestException('existed_employee_no');
      }
    }

    if (dto.isPermanent === false || contractStart || contractEnd) {
      const metas = await getManager()
        .createQueryBuilder(UserMeta, 'user_meta')
        .where('user_meta.userId = :id', { id: userLogged.id })
        .getMany();

      user.metas = metas;
      const normalized = User.prototype.normalizeEmployee(user);
      const employeeNormalize = mapper.map(
        normalized,
        NormalizeUserDto,
        NormalizeUser,
      );

      contractStart = contractStart || employeeNormalize.contractStart;
      contractEnd = contractEnd || employeeNormalize.contractEnd;
      if (!contractStart || !contractEnd) {
        throw new BadRequestException('invalid_contract_time');
      }
      const contractTime = this.standardContractTime({
        start: contractStart,
        end: contractEnd,
      });

      dto.contractStart = contractTime.start;
      dto.contractEnd = contractTime.end;

      EMPLOYEE_META_FIELDS.push(
        USER_META_FIELDS.CONTRACT_START,
        USER_META_FIELDS.CONTRACT_END,
      );

      const userMetasMap = pick(dto, EMPLOYEE_META_FIELDS);
      const userMetasKey: Partial<USER_META_FIELDS[]> = Object.keys(
        userMetasMap,
      ) as USER_META_FIELDS[];

      if (userMetasKey.length) {
        await Promise.all(
          userMetasKey.map((item) =>
            this.userMetaService.upsert(
              {
                userId: userLogged.id,
                key: item,
              },
              {
                userId: userLogged.id,
                key: item,
                value: userMetasMap[item],
              },
            ),
          ),
        );
      }

      await this.update({ id: user.id }, omit(dto, EMPLOYEE_META_FIELDS));
      const updatedUser = await this.getUser(userLogged.id);
      return updatedUser;
    }
  }
}
