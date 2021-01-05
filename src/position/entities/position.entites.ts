import { IsString, Length } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { BaseEntity, Column, Entity, Generated, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('position')
@Index(['id'])
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  @Length(1, 128)
  name: string;

  @OneToOne(() => Department)
  @JoinColumn()
  department: string;
}