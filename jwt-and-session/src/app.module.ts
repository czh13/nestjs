import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'saint',
    //   signOptions: {
    //     expiresIn: '1h',
    //   },
    // }),
    JwtModule.registerAsync({
      async useFactory() {
        await 1;
        return {
          secret: 'saint',
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
