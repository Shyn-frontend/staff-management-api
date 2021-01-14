import { Expose, Type } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";
import { BaseEntity, BaseModel } from "src/shared/base.entity";
import { User, UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

@Entity('department')
@Index(['id'])
export class DepartmentEntity extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 1024)
  name: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'managerId'
  })
  @IsOptional()
  manager: UserEntity;

  @Column({
    type: 'bool',
    default: true,
  })
  isBillable: boolean;
}

export class Department extends BaseModel {
  @Expose()
  name: string;

  @Expose()
  @Type(() => User)
  manager: User;

  @Expose()
  isBillable: boolean;
}
