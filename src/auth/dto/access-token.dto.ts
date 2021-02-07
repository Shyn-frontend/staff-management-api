import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenDto {
  @Field()
  type: string;

  @Field()
  accessToken: string;
}
