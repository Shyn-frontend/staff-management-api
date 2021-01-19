import { Expose, Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { Department, DepartmentEntity } from "./department.entity";
import { Position, PositionEntity } from "./position.entity";
import { Role, RoleEntity } from "./role.entity";
import { BaseEntity, BaseModel } from "../shared/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, Unique } from "typeorm";
import { USER_TYPE } from "../user/enum/user-type.enum";

@Entity()
@Unique(['email'])
@Index(['email', 'type'])
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

  @ManyToOne(() => PositionEntity, position => position.users)
  @JoinColumn()
  @IsOptional()
  position: PositionEntity;

  @ManyToOne(() => RoleEntity, role => role.users)
  @JoinColumn()
  role: RoleEntity;

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