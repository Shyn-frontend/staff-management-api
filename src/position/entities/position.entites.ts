import { Expose, Type } from "class-transformer";
import { IsString, Length } from "class-validator";
import { Department, DepartmentEntity } from "src/department/entities/department.entity";
import { BaseEntity, BaseModel } from "src/shared/base.entity";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

@Entity('position')
@Index(['id'])
export class PositionEntity extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 128)
  name: string;

  @OneToOne(() => DepartmentEntity)
  @JoinColumn()
  department: string;
}

export class Position extends BaseModel {
  @Expose()
  name: string;

  @Expose()
  @Type(() => Department)
  department: Department;
}