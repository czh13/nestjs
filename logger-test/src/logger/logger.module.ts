import { Global, Module } from '@nestjs/common';
import { MyloggerService } from 'src/mylogger.service';

@Global()
@Module({
  providers: [MyloggerService],
  exports: [MyloggerService],
})
export class LoggerModule {}
