import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'saint',
      resave: false,
      saveUninitialized: false,
      // resave 是 session 没变的时候要不要重新生成 cookie。
      // saveUninitialized 是没登录要不要也创建一个 session。
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
