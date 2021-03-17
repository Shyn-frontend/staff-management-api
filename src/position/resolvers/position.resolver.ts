import { AutoMap } from '@automapper/classes';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Pagination } from 'src/shared/base.entity';
import { CreatePositionParamsDto } from '../dto/create-position-params';
import { PositionDto } from '../dto/position.dto';
import { QueryPositionParamsDto } from '../dto/query-position-params.dto';
import { PositionService } from '../position.service';

@ObjectType()
export class QueryPositionResults {
  @Field(() => [PositionDto])
  @AutoMap(() => PositionDto)
  data: PositionDto[];

  @Field(() => Pagination)
  @AutoMap(() => Pagination)
  metadata: Pagination;
}
@Resolver()
@UseGuards(JwtAuthGuard)
class PositionResolver {
  constructor(private readonly positionService: PositionService) {}

  @Mutation(() => PositionDto)
  async createPosition(
    @Args('data') dto: CreatePositionParamsDto,
  ): Promise<PositionDto> {
    return this.positionService.createPosition(dto);
  }

  @Query(() => QueryPositionResults, { name: 'positions' })
  async getPositions(
    @Args('conditions', { nullable: true }) conditions?: QueryPositionParamsDto,
  ): Promise<QueryPositionResults> {
    const result = await this.positionService.getPositions(conditions);
    return result;
  }
}

export default PositionResolver;
