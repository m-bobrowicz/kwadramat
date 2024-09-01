import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class AuthHttpFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    Logger.log(
      `${exception.getStatus()} ${exception.message} ${exception.stack}`
    );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .clearCookie('token', {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: true,
      })
      .status(HttpStatus.UNAUTHORIZED)
      .json({
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
