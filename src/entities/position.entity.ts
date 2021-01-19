import { Expose, Type } from "class-transformer";
import { IsString, Length } from "class-validator";
import { Department, DepartmentEntity } from "./department.entity";
import { BaseEntity, BaseModel } from "../shared/base.entity";
import { User, UserEntity } from "./user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class PositionEntity extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 128)
  name: string;

  @ManyToOne(() => DepartmentEntity, department => department.positions)
  @JoinColumn()
  department: string;

  @OneToMany(() => UserEntity, user => user.position)
  users: UserEntity[];
}

export class Position extends BaseModel {
  @Expose()
  name: string;

  @Expose()
  @Type(() => Department)
  department: Department;

  @Expose()
  @Type(() => User)
  users: User[];
}