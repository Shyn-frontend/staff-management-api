import { BadRequestException, forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { UserEntity } from 'src/user/entities/user.entity';
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
    const isExistedDepartment = await this.findOne({ name });
    if (isExistedDepartment) {
      throw new BadRequestException('existed_department');
    }
    const department = this.repository.create({
      name,
      isBillable
    });
    if (managerId) {
      const manager = await this.userService.findOne({ id: managerId });
      if (!manager) {
        throw new BadRequestException('not_found_ manger');
      }
      department.manager = manager;
    }
    const [existedDepartment, manager] = await Promise.all[

    ];

    const res = await this.repository.save(department);
    return res;
  }
}
