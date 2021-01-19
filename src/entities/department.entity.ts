import { Expose, Type } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";
import { Position, PositionEntity } from "./position.entity";
import { BaseEntity, BaseModel } from "../shared/base.entity";
import { User, UserEntity } from "./user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('department')
export class DepartmentEntity extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 1024)
  name: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'managerId'
  })
  @IsOptional()
  manager: UserEntity;

  @Column({
    type: 'bool',
    default: true,
  })
  isBillable: boolean;

  @OneToMany(() => PositionEntity, position => position.department)
  positions: PositionEntity[];
}

export class Department extends BaseModel {
  @Expose()
  name: string;

  @Expose()
  @Type(() => User)
  manager: User;

  @Expose()
  isBillable: boolean;

  @Expose()
  @Type(() => Position)
  positions: Position[];
}
