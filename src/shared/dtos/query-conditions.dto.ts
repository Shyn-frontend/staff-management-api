import { FindOperator } from 'typeorm';

export interface IQueryConditions {
  [key: string]: string | string[] | number | boolean | FindOperator<string>;
}
