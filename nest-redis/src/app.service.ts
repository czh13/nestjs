import { Inject, Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
  async getHello() {
    const value = await this.redisClient.get('*');
    console.log('🚀 ~ AppService ~ getHello ~ value:', value);

    return 'Hello World!';
  }
}
