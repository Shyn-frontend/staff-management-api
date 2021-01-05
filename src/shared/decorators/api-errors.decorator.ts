import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ApiException } from '../api-exception.model';

export const ApiErrors = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiNotFoundResponse({ type: ApiException, description: 'Not found' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiInternalServerErrorResponse({
      type: ApiException,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
};
