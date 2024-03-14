/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) return next.handle();

    const authHeaderParts = authHeader.split(' ');
    const token = authHeaderParts[1]
    request.token = token

    return this.client.send('decode-token',token).pipe(
      switchMap((user) => {
        request.user = user;
        return next.handle();
      }),
      catchError(() => next.handle()),
    );
  }
}
