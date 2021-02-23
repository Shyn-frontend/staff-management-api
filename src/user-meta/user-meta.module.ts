import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeta } from 'src/entities/user-meta.entity';
import { UserMetaService } from './user-meta.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMeta])],
  providers: [UserMetaService],
  exports: [UserMetaService],
})
export class UserMetaModule {}
