import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiException } from '../api-exception';

export const ApiErrors = () => {
  return applyDecorators(
    ApiNotFoundResponse({ type: ApiException, description: 'Not Found' }),
    ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' }),
    ApiUnauthorizedResponse({ type: ApiException, description: 'Un Authorized' }),
    ApiInternalServerErrorResponse({ type: ApiException, description: 'Internal Server Error' }),
    ApiForbiddenResponse({ type: ApiException, description: 'Forbidden' })
  );
};
