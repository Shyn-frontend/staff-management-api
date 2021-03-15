import { AutoMap } from '@automapper/classes';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['id'])
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @AutoMap()
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @AutoMap()
  updatedAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  @AutoMap()
  deletedAt?: Date;
}

@ObjectType()
export class Pagination {
  @Field()
  page: number;

  @Field()
  pageSize: number;

  @Field()
  totalPages: number;
}
@ObjectType()
export class BaseDto {
  @AutoMap()
  @Field(() => ID)
  id: string;

  @AutoMap()
  @Field()
  createdAt?: Date;

  @AutoMap()
  @Field()
  updatedAt?: Date;

  @AutoMap()
  @Field()
  deletedAt?: Date;
}
