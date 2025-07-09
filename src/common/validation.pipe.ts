import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationErrorResponse } from './response.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value as Record<string, unknown>, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    }) as object;

    const errors = await validate(object as Record<string, unknown>, {
      whitelist: true,
      forbidNonWhitelisted: false,
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const errorMap: Record<string, string> = {};
      errors.forEach((error) => {
        if (error.constraints) {
          errorMap[error.property] = Object.values(error.constraints)[0];
        }
      });

      throw new HttpException(
        new ValidationErrorResponse('Please check your input', errorMap),
        422,
      );
    }

    return object;
  }

  private toValidate(metatype: new (...args: unknown[]) => unknown): boolean {
    const types: (new (...args: unknown[]) => unknown)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
