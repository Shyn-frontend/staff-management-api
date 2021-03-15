import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';

import { User } from 'src/entities/user.entity';
import { BaseService } from 'src/shared/base.service';
import { USER_TYPE } from 'src/user/enum/user-type.enum';
import { getManager, getRepository, Repository } from 'typeorm';

import { mapper } from 'src/shared/mapper/mapper';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateEmployeeParamsDto } from './dto/create-employee-params.dto';
import { UserMetaService } from 'src/user-meta/user-meta.service';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { PositionService } from 'src/position/position.service';
import { DepartmentService } from 'src/department/department.service';
import { USER_META_FIELDS } from 'src/entities/user-meta.entity';
import { pick } from 'lodash';
import getLimitPage from 'src/shared/utils/getLimitPage';
import { SearchParamsDto } from 'src/shared/dtos/search-params.dto';
import getMetadata from 'src/shared/utils/getMetadata';
import { QueryEmployeeResults } from './employee.resolver';

@Injectable()
export class EmployeeService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userMetaService: UserMetaService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly positionService: PositionService,
    private readonly departmentService: DepartmentService,
  ) {
    super();
    this.repository = this.userRepository;
  }

  async getEmployees(
    conditions: SearchParamsDto,
  ): Promise<QueryEmployeeResults> {
    const { limit, page } = conditions;
    const { _limit, _page } = getLimitPage(limit, page);

    const employees = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.type = :type', { type: USER_TYPE.EMPLOYEE })
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .leftJoinAndSelect('user.metas', 'meta')
      .take(_limit)
      .skip((_page - 1) * _limit)
      .getMany();

    const _count = await getRepository('user').count();
    return {
      data: mapper.mapArray(employees, UserDto, User),
      metadata: getMetadata(_page, _limit, _count),
    };
  }

  async createEmployee(dto: CreateEmployeeParamsDto): Promise<UserDto> {
    const [existingUser, existingEmail, role, position] = await Promise.all([
      this.userMetaService.findOne({
        key: 'employeeNo',
        value: dto.employeeNo,
      }),
      this.userService.findOne({
        email: dto.employeeNo,
      }),
      this.roleService.findById(dto.roleId),
      this.positionService.findById(dto.positionId),
    ]);

    if (existingUser) {
      throw new BadRequestException('employee_no_existed');
    }
    if (existingEmail) {
      throw new BadRequestException('email_already_existed');
    }
    if (!role) {
      throw new BadRequestException('not_found_role');
    }
    if (!position) {
      throw new BadRequestException('not_found_position');
    }

    const userMetaData: Partial<USER_META_FIELDS>[] = [
      USER_META_FIELDS.EMPLOYEE_NO,
      USER_META_FIELDS.WEEKLY_HOURS,
    ];

    if (dto.hourlyRate >= 0) {
      userMetaData.push(USER_META_FIELDS.HOURLY_RATE);
    }
    if (!dto.isPermanent && dto.contractStart && dto.contractStart) {
      if (
        moment(dto.contractStart)
          .startOf('day')
          .isAfter(moment(dto.contractEnd).endOf('day'))
      ) {
        throw new BadRequestException('invalid_contract_time');
      }
      dto.contractStart = moment(dto.contractStart)
        .startOf('day')
        .format('YYYY-MM-DD');
      dto.contractStart = moment(dto.contractEnd)
        .endOf('day')
        .format('YYYY-MM-DD');
    }

    const userData: Partial<CreateEmployeeParamsDto> = pick(dto, [
      'name',
      'avatar',
      'email',
      'departmentId',
      'positionId',
      'roleId',
      'isPermanent',
    ]);

    const employeeRepo = this.userService.createRepo(userData);
    const employeeCreated = await this.create(employeeRepo);

    const userMeta: Partial<CreateEmployeeParamsDto> = pick(dto, userMetaData);
    if (!userMeta.weeklyHours) {
      userMeta.weeklyHours = 40;
    }
    const repos = Object.keys(userMeta).map((item) => {
      return this.userMetaService.createRepo({
        userId: employeeCreated.id,
        key: USER_META_FIELDS[item],
        value: userMeta[item],
      });
    });

    await Promise.all(repos.map((repo) => this.userMetaService.create(repo)));

    const employee = await this.userService.getUser(employeeCreated.id);
    return employee;
  }
}
