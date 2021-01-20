import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from '../entities/department.entity';
import { mapper } from 'src/shared/mapper/mapper';
import { DepartmentDto } from './dto/department.dto';

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

  async createDepartment({ name, managerId, isBillable }: CreateDepartmentDto): Promise<DepartmentDto> {
    const [existedDepartment, manager] = await Promise.all([
      this.findOne({ name }),
      this.userService.findOne({ id: managerId }),
    ]);

    if (existedDepartment) {
      throw new BadRequestException('existed_department');
    }

    if (!manager) {
      throw new BadRequestException('not_found_ manger');
    }

    const department = this.createRepo({
      name,
      isBillable,
      manager,
    });

    const newDepartment = await this.create(department);
    return  mapper.map(newDepartment, DepartmentDto, Department);
  }
}
