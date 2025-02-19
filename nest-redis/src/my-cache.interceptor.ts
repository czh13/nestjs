import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { RedisClientType } from 'redis';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  @Inject(HttpAdapterHost)
  private httpadapterHost: HttpAdapterHost;
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const key = this.httpadapterHost.httpAdapter.getRequestUrl(req);
    const value = await this.redisClient.get(key);
    if (!value) {
      return next.handle().pipe(
        tap((res) => {
          this.redisClient.set(key, res);
        }),
      );
    } else {
      return of(value);
    }
  }
}
