import { BadRequestException, forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department, DepartmentEntity } from './entities/department.entity';

@Injectable()
export class DepartmentService extends BaseService<DepartmentEntity> {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
    private readonly userService: UserService,
  ) {
    super();
    this.repository = departmentRepository;
  }

  async createDepartment({ name, managerId, isBillable }: CreateDepartmentDto): Promise<DepartmentEntity> {
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

    const department = this.repository.create({
      name,
      isBillable,
      manager,
    });

    const res = await this.repository.save(department);
    return res;
  }
}
