import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  @UseGuards(AuthGuard('github'))
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  authCallback(@Req() req) {
    return this.appService.findUserByGithubId(req.user.id);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
