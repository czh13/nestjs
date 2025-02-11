import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaPipe } from './aaa.pipe';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import type { Kkk } from './kkk.dto';

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('name', ParseIntPipe) name: string): string {
    return this.appService.getHello();
  }

  @Get('world')
  getWorld(
    @Query(
      'name',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
        // exceptionFactory: () => {
        //   throw new HttpException('not found', HttpStatus.NOT_FOUND);
        // },
      }),
    )
    name: string,
  ): string {
    return this.appService.getHello();
  }

  // http://127.0.0.1:3000/eee?ee=1,2,3
  @Get('eee')
  getEee(
    @Query(
      'ee',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    ee: number[],
  ): number {
    return ee.reduce((a, b) => a + b, 0);
  }

  // http://127.0.0.1:3000/fff?ff=a..b..c
  @Get('fff')
  getFff(
    @Query(
      'ff',
      new ParseArrayPipe({
        separator: '..',
        optional: true,
      }),
    )
    ff: string[],
  ) {
    console.log(ff);
    // ['a', 'b', 'c'];
    return ff;
  }

  // 限制参数的取值范围：
  @Get('ggg/:enum')
  getGgg(
    @Query('enum', new ParseEnumPipe(UserStatus)) status: UserStatus,
  ): UserStatus {
    return status;
  }

  @Get('hhh')
  getHhh(@Query('hh', new ParseUUIDPipe()) hh: string): string {
    return hh;
  }

  @Get('iii')
  getIii(@Query('ii', new DefaultValuePipe('default')) ii: string): string {
    return ii;
  }

  // http://127.0.0.1:3000/jjj/12?jj=2
  @Get('jjj/:jj')
  getJjj(
    @Query('jj', new AaaPipe()) jj: number, // 传入的2被转成aaa
    @Param('jj') jj2: number,
  ): number {
    return jj + jj2;
  }

  @Post('kkk')
  getkkk(@Body(new ValidationPipe()) body: Kkk) {
    console.log(body);
  }
}
