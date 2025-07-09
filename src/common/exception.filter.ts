import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationErrorResponse, ErrorResponse } from './response.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const data = exception.getResponse();

      if (status === 422) {
        response.status(status).json(data as ValidationErrorResponse);
        return;
      }

      response.status(status).json(new ErrorResponse(exception.message));
      return;
    }

    // Log detailed error information for internal server errors
    this.logger.error(exception.message, exception.stack);

    // For all other exceptions, return a generic internal server error response
    const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json(new ErrorResponse('Internal server error'));
  }
}
