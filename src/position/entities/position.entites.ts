import { IsString, Length } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { BaseEntity, Column, JoinColumn, OneToOne } from "typeorm";

export class Position extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 128)
  name: string;

  @OneToOne(() => Department)
  @JoinColumn()
  department: string;
}