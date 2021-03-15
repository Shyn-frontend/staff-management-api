import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/department.service';
import { Position } from 'src/entities/position.entity';
import { BaseService } from 'src/shared/base.service';
import { mapper } from 'src/shared/mapper/mapper';
import { getManager, getRepository, Like, Repository } from 'typeorm';
import { CreatePositionParamsDto } from './dto/create-position-params';
import { PositionDto } from './dto/position.dto';
import { QueryPositionParamsDto } from './dto/query-position-params.dto';
import { QueryPositionResults } from './resolvers/position.resolver';
import { IQueryConditions } from '../shared/dtos/query-conditions.dto';
import getMetadata from 'src/shared/utils/getMetadata';
import getLimitPage from 'src/shared/utils/getLimitPage';

@Injectable()
export class PositionService extends BaseService<Position> {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @Inject(forwardRef(() => DepartmentService))
    private departmentService: DepartmentService,
  ) {
    super();
    this.repository = positionRepository;
  }

  async createPosition(dto: CreatePositionParamsDto): Promise<PositionDto> {
    const { name, departmentId } = dto;
    const department = await this.departmentService.findOne({
      id: departmentId,
    });
    if (!department) {
      throw new BadRequestException('not_found_department');
    }

    const isExistedPosition = await this.findOne({ name, departmentId });
    if (isExistedPosition) {
      throw new BadRequestException('existed_position');
    }

    const position = this.createRepo(dto);
    const created: Position = await this.create(position);

    return mapper.map(created, PositionDto, Position);
  }

  async getPositions(
    queries: QueryPositionParamsDto,
  ): Promise<QueryPositionResults> {
    const { name, departmentId, limit, page } = queries;
    const { _limit, _page } = getLimitPage(limit, page);

    const query = getManager()
      .createQueryBuilder(Position, 'position')
      .take(_limit)
      .skip((_page - 1) * _limit)
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('department.manager', 'manager');

    if (name) {
      query.where('position.name like :name', { name: `%${name}%` });
    }

    if (departmentId) {
      query.where('position.departmentId = :departmentId', { departmentId });
    }

    const queriesObject: IQueryConditions = {};
    if (name) {
      queriesObject.name = Like(`%${name}%`);
    }
    if (departmentId) {
      queriesObject.departmentId = departmentId;
    }
    const [positions, _count] = await Promise.all([
      query.getMany(),
      getRepository(Position).count(queriesObject),
    ]);

    const data = mapper.mapArray(positions, PositionDto, Position);
    const metadata = getMetadata(_page, _limit, _count);

    return {
      data,
      metadata,
    };
  }
}
