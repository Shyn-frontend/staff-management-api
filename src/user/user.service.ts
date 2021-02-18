import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeta } from 'src/entities/user-meta.entity';
import { BaseService } from 'src/shared/base.service';
import { mapper } from 'src/shared/mapper/mapper';
import { getManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
    this.repository = userRepository;
  }

  async getUser(id: string): Promise<UserDto> {
    const user = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .getOne();
    if (!user) {
      throw new BadRequestException('not_found_user');
    }

    const metas = await getManager()
      .createQueryBuilder(UserMeta, 'user_meta')
      .where('user_meta.userId = :id', { id })
      .getMany();

    user.metas = metas;
    return mapper.map(user, UserDto, User);
  }
}
