import { IsString, Length } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { BaseModel } from "src/shared/base.entity";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

@Entity('position')
@Index(['id'])
export class Position extends BaseModel {
  @Column()
  @IsString()
  @Length(1, 128)
  name: string;

  @OneToOne(() => Department)
  @JoinColumn()
  department: string;
}