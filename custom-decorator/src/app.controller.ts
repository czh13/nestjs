import {
  Controller,
  Get,
  Header,
  Headers,
  ParseIntPipe,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa, Bbb, Ccc, Ddd, MyHeader, MyQuery } from './aaa.decorator';

// @Controller()
@Ddd('hello', 'user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello2')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello2(): string {
    return this.appService.getHello();
  }

  @Bbb('hello3', 'admin')
  getHello3(): string {
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@Ccc() ccc: string): string {
    return ccc;
  }

  @Get('hello5')
  getHello5(@Headers('Accept') headers1, @MyHeader('Accept') headers2) {
    console.log(headers1, headers2);
  }

  @Get('hello6')
  getHello6(
    @MyQuery('aaa', new ParseIntPipe()) aaa: string,
    @Query('bbb') bbb: string,
  ) {
    console.log(aaa, bbb);
  }
}
