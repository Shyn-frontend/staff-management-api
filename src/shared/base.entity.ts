import { Expose } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, EntityRepository, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null
  })
  deletedAt?: Date;
}

export class BaseModel {
  @Expose()
  id: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedA?: Date;
}