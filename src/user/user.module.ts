import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeta } from 'src/entities/user-meta.entity';
import { User } from '../entities/user.entity';
import UserResolver from './resolvers/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserMeta]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
