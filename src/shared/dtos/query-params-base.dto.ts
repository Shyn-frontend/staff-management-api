import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class QueryParamsBaseDto {
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  page?: number;
}
