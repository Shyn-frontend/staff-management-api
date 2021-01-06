import { IsDate, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { Position } from "src/position/entities/position.entites";
import { Role } from "src/role/entities/role.entity";
import { BaseModel } from "src/shared/base.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from "typeorm";

export enum USER_TYPE {
  ADMIN = 'admin',
  CLIENT = 'client',
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  PLACEHOLDER = 'placeholder'
}

@Entity('user')
@Unique(['email'])
@Index(['id', 'email', 'type'])
export class User extends BaseModel {
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

  @OneToOne(() => Position)
  @JoinColumn()
  position: Position;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

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