import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { CreatePositionParamsDto } from './dto/create-position-params';
import { PositionDto } from './dto/position.dto';
import { PositionService } from './position.service';

@Controller('position')
@ApiTags('Position')
@ApiErrors()
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: PositionDto,
    description: 'Create position successfully',
  })
  async createPosition(
    @Body() dto: CreatePositionParamsDto,
  ): Promise<PositionDto> {
    return this.positionService.createPosition(dto);
  }
}
