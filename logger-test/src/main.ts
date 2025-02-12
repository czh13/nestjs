import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyloggerService } from './mylogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // logger: ['warn', 'error'],
    // logger: new MyloggerService(), // 自定义logger
    bufferLogs: true, // 缓存日志
  });
  app.useLogger(app.get(MyloggerService)); // 注入依赖形式
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
