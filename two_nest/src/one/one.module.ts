import {
  Global,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  type OnModuleDestroy,
  type BeforeApplicationShutdown,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { OneService } from './one.service';
import { OneController } from './one.controller';

@Global()
@Module({
  controllers: [OneController],
  providers: [OneService],
  exports: [OneService],
})
export class OneModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleDestroy() {
    console.log('OneModule onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('OneModule beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('OneModule onApplicationShutdown');
  }

  onModuleInit() {
    console.log('OneModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('OneModule onApplicationBootstrap');
  }
}
