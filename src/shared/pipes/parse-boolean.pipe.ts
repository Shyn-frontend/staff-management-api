import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseBoolPipe implements PipeTransform<string, boolean> {
  transform(value: any, { type, metatype }: ArgumentMetadata) {
    if (
      type !== 'query' ||
      metatype !== Boolean ||
      (value !== 'true' && value !== 'false')
    ) {
      throw new BadRequestException('Argument must be a boolean');
    }
    return value === 'true';
  }
}
