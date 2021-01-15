import { Expose } from "class-transformer";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { ExposedApiProperty, ExposedApiPropertyOptional } from "./decorators/exposed-api-model-property.decorator";

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
  updatedAt?: Date;

  @Expose()
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