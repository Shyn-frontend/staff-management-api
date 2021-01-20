import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty()
  @AutoMap()
  type: string;

  @ApiProperty()
  @AutoMap()
  accessToken: string;
}
