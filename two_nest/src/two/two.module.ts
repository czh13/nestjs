import {
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  type BeforeApplicationShutdown,
  type OnApplicationShutdown,
  type OnModuleDestroy,
} from '@nestjs/common';
import { TwoService } from './two.service';
import { TwoController } from './two.controller';

@Module({
  imports: [],
  controllers: [TwoController],
  providers: [TwoService],
})
export class TwoModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleDestroy() {
    console.log('TwoModule onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('TwoModule beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('TwoModule onApplicationShutdown');
  }

  onModuleInit() {
    console.log('TwoModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('TwoModule onApplicationBootstrap');
  }
}
