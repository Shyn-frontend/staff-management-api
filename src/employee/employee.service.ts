import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeta } from 'src/entities/user-meta.entity';
import { User } from 'src/entities/user.entity';
import { BaseService } from 'src/shared/base.service';
import { USER_TYPE } from 'src/user/enum/user-type.enum';
import { getManager, Repository } from 'typeorm';

import { Promise } from 'bluebird';
import { mapper } from 'src/shared/mapper/mapper';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class EmployeeService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
    this.repository = userRepository;
  }

  async getEmployees(): Promise<UserDto[]> {
    const employees = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.type = :type', { type: USER_TYPE.EMPLOYEE })
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .getMany();

    const metas = getManager();
    const promises = {};
    employees.forEach((e) => {
      promises[e.id] = metas
        .createQueryBuilder(UserMeta, 'user_meta')
        .where('user_meta.userId = :id', { id: e.id })
        .getMany();
      return;
    });
    const metasByEmployeeId = await Promise.props(promises);
    const employeesMapMetas = employees.map((e) => {
      e.metas = metasByEmployeeId[e.id];
      return e;
    });
    return mapper.mapArray(employeesMapMetas, UserDto, User);
  }
}
