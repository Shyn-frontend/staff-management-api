import { MappingProfile } from '@automapper/types';
import { Position } from 'src/entities/position.entity';
import { UserPositionDto } from 'src/user/dto/user-position.dto';
import { PositionDto } from '../dto/position.dto';

export const PositionProfile: MappingProfile = (mapper) => {
  mapper.createMap(Position, PositionDto);
  mapper.createMap(Position, UserPositionDto);
};
