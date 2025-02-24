import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { IsPublic } from './is-public.decorator';

interface JwtUserData {
  userId: number;
  username: string;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject()
  private jwtService: JwtService;

  @IsPublic()
  @Get('aaa')
  aaa() {
    return 'aaa';
  }
  @Get('bbb')
  bbb() {
    return 'bbb';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  list(@Req() req: Request) {
    console.log(req.user);
    return ['111', '222', '333', '444', '555'];
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() request: Request) {
    const token = this.jwtService.sign(
      {
        userId: request.user.userId,
        username: request.user.username,
      },
      {
        expiresIn: '30m',
      },
    );
    return {
      token,
      user: request.user,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
