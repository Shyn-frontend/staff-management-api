import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { weekdaysShort } from 'moment';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
weekdaysShort