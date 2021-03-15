import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { SearchParamsDto } from "src/shared/dtos/search-params.dto";

@InputType()
export class QueryPositionParamsDto extends SearchParamsDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  departmentId?: string;
}
