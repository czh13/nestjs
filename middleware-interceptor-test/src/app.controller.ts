import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaInterceptor } from './aaa.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';
import { TapTestInterceptor } from './tap-test.interceptor';
import { CatchErrorTestInterceptor } from './catch-error-test.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @UseInterceptors(MapTestInterceptor)
  getHello(): string {
    console.log('getHello');
    return this.appService.getHello();
  }

  @Get('hello2')
  @UseInterceptors(AaaInterceptor)
  getHello2(): string {
    console.log('getHello2');
    return this.appService.getHello();
  }

  @Get('hello3')
  @UseInterceptors(TapTestInterceptor)
  getHello3(): string {
    console.log('getHello3');
    return this.appService.getHello();
  }

  @Get('world')
  @UseInterceptors(CatchErrorTestInterceptor)
  getWorld(): string {
    console.log('getWorld');
    throw new Error('error');
    return this.appService.getHello();
  }
}
