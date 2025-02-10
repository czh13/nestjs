import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
@UseFilters(TestFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('handler');
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  getAaa(): string {
    console.log('handler');
    return 'aaa';
  }

  @Get('bbb')
  @UseInterceptors(TimeInterceptor)
  getBbb(): string {
    console.log('handler');
    return 'bbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  getCcc(@Query('num', ValidatePipe) num: number): number {
    return num + 1;
  }
}
