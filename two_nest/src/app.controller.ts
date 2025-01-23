import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('human') private readonly human: { name: string; age: number },
    @Inject('people')
    private readonly people: { name: string; age: number; desc: string },
    @Inject('async')
    private readonly async: Promise<{ name: string; age: number }>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('person')
  getPerson(): { name: string; age: number } {
    return this.person;
  }

  @Get('human')
  getHuman(): { name: string; age: number } {
    return this.human;
  }

  @Get('people')
  getPeople(): { name: string; age: number; desc: string } {
    return this.people;
  }

  @Get('async')
  getAsync(): Promise<{ name: string; age: number }> {
    return this.async;
  }
}
