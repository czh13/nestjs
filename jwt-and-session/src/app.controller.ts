import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sss')
  sss(@Session() session) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('ttt')
  ttt(
    @Headers('Authorization') authorization: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);
        const newToken = this.jwtService.sign({ count: data.count + 1 });
        response.setHeader('Authorization', `Bearer ${newToken}`);
      } catch (error) {
        throw new UnauthorizedException();
      }
      return;
    }

    const token = this.jwtService.sign({ count: 1 });
    response.setHeader('Authorization', `Bearer ${token}`);
    return 'ttt';
  }
}
