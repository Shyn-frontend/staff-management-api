import { AutoMap } from "@automapper/classes";
import { Column, Index, PrimaryGeneratedColumn } from "typeorm";
import { ExposedApiProperty, ExposedApiPropertyOptional } from "./decorators/exposed-api-model-property.decorator";

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
    default: null
  })
  @AutoMap()
  deletedAt?: Date;
}

export class BaseDto {
  @ExposedApiProperty()
  id: string;

  @ExposedApiPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: Date;

  @ExposedApiPropertyOptional({ type: String, format: 'date-time' })
  updatedAt?: Date;

  @ExposedApiPropertyOptional({ type: String, format: 'date-time' })
  deletedAt?: Date;
}