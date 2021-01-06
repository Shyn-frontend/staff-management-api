import { IsOptional, IsString, Length } from "class-validator";
import { BaseModel } from "src/shared/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

@Entity('department')
@Index(['id'])
export class Department extends BaseModel {
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