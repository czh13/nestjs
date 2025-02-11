import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    // type: VersioningType.URI,  // 请求头
    // header: 'version',

    // type: VersioningType.MEDIA_TYPE, // 请求头
    // key: 'vv=',

    type: VersioningType.URI, // v2
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
