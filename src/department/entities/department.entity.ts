import { IsOptional, IsString, Length } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, Generated, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('department')
@Index(['id'])
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  @Length(1, 1024)
  name: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'managerId'
  })
  @IsOptional()
  manager: User;

  @Column({
    type: 'bool',
    default: true,
  })
  isBillable: boolean;
}