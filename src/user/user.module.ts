import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { weekdaysShort } from 'moment';
import { User } from '../entities/user.entity';
import UserResolver from './resolvers/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
weekdaysShort;
