import { MappingProfile } from '@automapper/types';
import { UserMeta } from 'src/entities/user-meta.entity';
import { UserMetaDto } from '../dto/user-meta.dto';

export const UserMetaProfile: MappingProfile = (mapper) => {
  mapper.createMap(UserMeta, UserMetaDto);
};
