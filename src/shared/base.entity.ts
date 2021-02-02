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
export class BaseDto {
  @ApiProperty()
  @AutoMap()
  @Field(() => ID)
  id: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  @Field()
  createdAt?: Date;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  @Field()
  updatedAt?: Date;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  @Field()
  deletedAt?: Date;
}
