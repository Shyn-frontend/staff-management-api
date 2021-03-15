import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { UserService } from 'src/user/user.service';
import { getManager, getRepository, Repository } from 'typeorm';
import { CreateDepartmentParamsDto } from './dto/create-department-params.dto';
import { Department } from '../entities/department.entity';
import { mapper } from 'src/shared/mapper/mapper';
import { DepartmentDto } from './dto/department.dto';
import { QueryParamsBaseDto } from 'src/shared/dtos/query-params-base.dto';
import getLimitPage from 'src/shared/utils/getLimitPage';
import getMetadata from 'src/shared/utils/getMetadata';
import { QueryDepartmentResults } from './resolvers/department.resolver';

@Injectable()
export class DepartmentService extends BaseService<Department> {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private readonly userService: UserService,
  ) {
    super();
    this.repository = departmentRepository;
  }

  async createDepartment(
    dto: CreateDepartmentParamsDto,
  ): Promise<DepartmentDto> {
    const { name, managerId } = dto;
    const [existedDepartment, manager] = await Promise.all([
      this.findOne({ name }),
      this.userService.findById(managerId),
    ]);
    if (existedDepartment) {
      throw new BadRequestException('existed_department');
    }
    if (!manager) {
      throw new BadRequestException('not_found_ manger');
    }

    const department = this.createRepo({ ...dto, manager });
    const created: Department = await this.create(department);
    return mapper.map(created, DepartmentDto, Department);
  }

  async getDepartments(
    conditions: QueryParamsBaseDto,
  ): Promise<QueryDepartmentResults> {
    const { limit, page } = conditions;
    const { _limit, _page } = getLimitPage(limit, page);

    const departments = await getManager()
      .createQueryBuilder(Department, 'department')
      .leftJoinAndSelect('department.manager', 'manager')
      .take(_limit)
      .skip((_page - 1) * _limit)
      .getMany();

    const _count = await getRepository('department').count();
    return {
      data: mapper.mapArray(departments, DepartmentDto, Department),
      metadata: getMetadata(_page, _limit, _count),
    };
  }
}
