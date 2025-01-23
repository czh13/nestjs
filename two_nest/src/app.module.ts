import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OneModule } from './one/one.module';
import { TwoModule } from './two/two.module';

@Module({
  imports: [OneModule, TwoModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'person', useValue: { name: 'John', age: 30 } },
    {
      provide: 'human',
      useFactory: () => ({ name: 'John', age: 30 }),
    },
    {
      provide: 'people',
      useFactory: (
        person: { name: string; age: number },
        appService: AppService,
      ) => ({
        name: person.name,
        age: person.age,
        desc: appService.getHello(),
      }),
      inject: ['person', AppService],
    },
    {
      provide: 'async',
      useFactory: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { name: 'John', age: 30 };
      },
    },
  ],
})
export class AppModule {}
