import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  accessToken: string;
}
