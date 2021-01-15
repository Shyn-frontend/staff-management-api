import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { Expose, ExposeOptions, TypeOptions, Type } from 'class-transformer';

interface ModelPropertyMetadata {
  description?: string;
  required?: boolean;
  type?: any;
  isArray?: boolean;
  collectionFormat?: string;
  default?: any;
  enum?: SwaggerEnumType;
  format?: string;
  in?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  readOnly?: boolean;
  nullable?: boolean;
  xml?: any;
  example?: any;
}

export const ExposedApiProperty = (
  metadata?: ModelPropertyMetadata,
  exposeOptions?: ExposeOptions,
) => (target: any, propertyKey: string) => {
  Expose(exposeOptions)(target, propertyKey);
  ApiProperty(metadata)(target, propertyKey);
};

export const ExposedApiPropertyOptional = (
  metadata?: Omit<ModelPropertyMetadata, 'required'>,
  exposeOptions?: ExposeOptions,
) => (target: any, propertyKey: string) => {
  Expose(exposeOptions)(target, propertyKey);
  ApiPropertyOptional(metadata)(target, propertyKey);
};

export const ExposedMappedApiProperty = (
  metadata?: ModelPropertyMetadata,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions,
) => (target: any, propertyKey: string) => {
  const typeFn =
    typeof metadata.type === 'function' ? metadata.type : () => metadata.type;
  Expose(exposeOptions)(target, propertyKey);
  Type(typeFn, typeOptions)(target, propertyKey);
  ApiProperty(metadata)(target, propertyKey);
};

export const ExposedMappedApiPropertyOptional = (
  metadata?: Omit<ModelPropertyMetadata, 'required'>,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions,
) => (target: any, propertyKey: string) => {
  const typeFn =
    typeof metadata.type === 'function' ? metadata.type : () => metadata.type;
  Expose(exposeOptions)(target, propertyKey);
  Type(typeFn, typeOptions)(target, propertyKey);
  ApiPropertyOptional(metadata)(target, propertyKey);
};
