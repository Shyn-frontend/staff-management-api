import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from 'src/position/position.module';
import { RoleModule } from 'src/role/role.module';
import { UserMetaModule } from 'src/user-meta/user-meta.module';
import { User } from '../entities/user.entity';
import UserResolver from './resolvers/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    PositionModule,
    UserMetaModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
