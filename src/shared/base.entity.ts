import { Column, Generated, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['id'])
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  deletedAt?: Date;
}