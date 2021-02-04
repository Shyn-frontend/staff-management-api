import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePositionParamsDto } from '../dto/create-position-params';
import { PositionDto } from '../dto/position.dto';
import { PositionService } from '../position.service';

@Resolver()
@UseGuards(JwtAuthGuard)
class PositionResolver {
  constructor(private positionService: PositionService) {}

  @Mutation(() => PositionDto)
  async createPosition(
    @Args('position') dto: CreatePositionParamsDto,
  ): Promise<PositionDto> {
    return this.positionService.createPosition(dto);
  }
}

export default PositionResolver;
