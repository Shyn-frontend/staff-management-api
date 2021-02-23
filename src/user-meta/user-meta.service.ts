import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeta } from 'src/entities/user-meta.entity';
import { BaseService } from 'src/shared/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserMetaService extends BaseService<UserMeta> {
  constructor(
    @InjectRepository(UserMeta)
    private userMetaRepository: Repository<UserMeta>,
  ) {
    super();
    this.repository = userMetaRepository;
  }
}
