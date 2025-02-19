import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BbbModule } from './bbb/bbb.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(process.cwd(), '.aaa.env'), //前面的配置会覆盖后面的配置
        path.join(process.cwd(), '.env'),
      ],
      // load: [config],
    }),
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
