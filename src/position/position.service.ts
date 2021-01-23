import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/department.service';
import { Position } from 'src/entities/position.entity';
import { BaseService } from 'src/shared/base.service';
import { mapper } from 'src/shared/mapper/mapper';
import { Repository } from 'typeorm';
import { CreatePositionParamsDto } from './dto/create-position-params';
import { PositionDto } from './dto/position.dto';

@Injectable()
export class PositionService extends BaseService<Position> {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
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
}
