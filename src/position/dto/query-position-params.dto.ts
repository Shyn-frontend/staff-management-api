import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsBaseDto } from 'src/shared/dtos/query-params-base.dto';

@InputType()
export class QueryPositionParamsDto extends QueryParamsBaseDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  departmentId?: string;
}
