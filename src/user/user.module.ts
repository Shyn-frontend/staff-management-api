import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { weekdaysShort } from 'moment';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
weekdaysShort;
