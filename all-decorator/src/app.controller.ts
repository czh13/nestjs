import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  Ip,
  Optional,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  SetMetadata,
  UseFilters,
  UseGuards,
  UsePipes,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import type { BbbDto } from './bbb.dto';
import { AaaGuard } from './aaa.guard';

@Controller()
@SetMetadata('roles', ['admin', 'user'])
export class AppController {
  // constructor(private readonly appService: AppService) { }

  @Inject(AppService)
  private readonly appService: AppService;

  @Inject('Guang')
  @Optional()
  private readonly guang: Record<string, any>;

  @Get('/xxx/:aaa')
  @UseFilters(AaaFilter)
  // @UsePipes(ParseIntPipe)
  getHello(
    @Param('aaa') aaa: ParseIntPipe,
    @Query('bbb', ParseBoolPipe) bbb: boolean,
  ): string {
    console.log(this.guang);
    console.log(aaa, bbb);
    // throw new HttpException('test', HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }

  @Post('/bbb')
  @UseGuards(AaaGuard)
  @SetMetadata('roles', ['admin'])
  getBbb(@Body() body: BbbDto): string {
    console.log(body);
    return 'bbb';
  }

  @Get('/ccc')
  getCcc(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, string>,
  ): string {
    console.log(accept);
    console.log(headers);
    return 'ccc';
  }

  @Get('/ip')
  ip(@Ip() ip: string): string {
    console.log(ip);
    return 'ip';
  }

  @Get('/session')
  session(@Session() session: Record<string, any>): string {
    console.log(session);
    return 'session';
  }
}
