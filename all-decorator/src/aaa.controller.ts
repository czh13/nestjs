import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Next,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response, type NextFunction } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('host')
  host(@HostParam('host') host: string): string {
    console.log(host);
    return 'host';
  }

  @Get('path')
  path(@Req() req: Request): string {
    console.log(req.url);
    console.log(req.hostname);
    return 'path';
  }

  @Get('ddd')
  ddd(@Res({ passthrough: true }) res: Response) {
    return 'ddd';
    // ddd(@Res() res: Response) {
    // res.send('ddd');
  }

  @Get('eee')
  eee(@Next() next: NextFunction) {
    console.log('handler1');
    next(); //转发接口eee
    return 'eee';
  }

  @Get('eee')
  eee2() {
    console.log('handler2');
    return 'eee2';
  }

  @Get('fff')
  @HttpCode(222)
  fff() {
    return 'fff';
  }

  @Get('ggg')
  @Header('aaa', 'bbb')
  ggg() {
    return 'ggg';
  }

  @Get('hhh')
  // @Redirect('https://www.baidu.com', 301)
  @Redirect()
  hhh() {
    // return 'hhh';
    return {
      url: 'https://www.baidu.com',
      statusCode: 301,
    };
  }
}
