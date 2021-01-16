import { Expose, Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { Department, DepartmentEntity } from "src/department/entities/department.entity";
import { Position, PositionEntity } from "src/position/entities/position.entity";
import { Role, RoleEntity } from "src/role/entities/role.entity";
import { BaseEntity, BaseModel } from "src/shared/base.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from "typeorm";
import { USER_TYPE } from "../enum/user-type.enum";

@Entity('user')
@Unique(['email'])
@Index(['id', 'email', 'type'])
export class UserEntity extends BaseEntity {
  @Column()
  @IsEmail()
  @IsOptional()
  @Length(1, 128)
  email: string;

  @Column()
  @IsString()
  @Length(1, 128)
  password: string;

  @Column()
  @IsString()
  @Length(1, 128)
  name: string;

  @Column({
    type: 'enum',
    enum: USER_TYPE,
    default: USER_TYPE.EMPLOYEE,
  })
  type: USER_TYPE;

  @OneToOne(() => PositionEntity)
  @JoinColumn()
  position: PositionEntity;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role: RoleEntity;

  @OneToOne(() => DepartmentEntity)
  department: DepartmentEntity;

  @Column()
  @IsString()
  @Length(1, 1024)
  avatar: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isArchived: boolean;

  @Column()
  @IsDate()
  permanentLeaveAt: Date;

  @Column({
    type: 'boolean',
    default: false
  })
  isComplete: boolean;

  @Column({
    type: 'boolean',
    default: true
  })
  isPermanent: boolean;
}

export class User extends BaseModel {
  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  name: string;

  @Expose()
  type: USER_TYPE;

  @Expose()
  @Type(() => Position)
  position: Position;

  @Expose()
  @Type(() => Role)
  role: Role;

  @Expose()
  @Type(() => Department)
  department: Department;

  @Expose()
  avatar?: string;

  @Expose()
  isArchived: boolean;

  @Expose()
  permanentLeaveAt?: Date;

  @Expose()
  isComplete: boolean;

  @Expose()
  isPermanent: boolean;
}