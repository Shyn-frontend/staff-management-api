import { IsOptional, IsString, Length } from "class-validator";
import { Position } from "src/position/entities/position.entites";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Index, JoinColumn, OneToOne } from "typeorm";

@Index(['id'])
export class Department extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 1024)
  name: string;

  @OneToOne(() => User)
  @JoinColumn()
  @IsOptional()
  manager: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isBillable: boolean;
}