import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    session({
      secret: 'guang',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
