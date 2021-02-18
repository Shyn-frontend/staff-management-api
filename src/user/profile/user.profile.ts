import { MappingProfile } from '@automapper/types';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { User } from 'src/entities/user.entity';
import { ManagerDto } from '../dto/manager.dto';
import { UserDto } from '../dto/user.dto';

export const UserProfile: MappingProfile = (mapper) => {
  mapper.createMap(User, AuthUserDto);
  mapper.createMap(User, ManagerDto);
  mapper.createMap(User, UserDto);
};
