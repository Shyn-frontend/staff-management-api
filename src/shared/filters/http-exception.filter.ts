import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ApiException } from "../api-exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const statusCode = exception.getStatus();
    const stacktrace = exception.stack;
    const errorResponse = exception.getResponse();
    let errorName = exception.name;
    let errors = null;

    if (typeof errorResponse === 'object') {
      errorName = errorResponse['name'] || errorResponse['error'] || exception.name;
      errors = errorResponse['errors'];

      if (statusCode === HttpStatus.UNAUTHORIZED) {
        errorResponse['message'] = errorResponse['message'] || 'Unauthorized';
      }
    }

    const path = req?.url;
    const apiException = new ApiException(
      errorResponse['message'],
      errorName,
      stacktrace,
      errors,
      path,
      statusCode,
    );
    res.status(statusCode).json(apiException);
  }
}