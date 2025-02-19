import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  Get,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        id: foundUser.id,
        username: user.username,
      });
      response.setHeader('Authorization', `Bearer ${token}`);
      return { message: '登录成功' };
    }
    return { message: '用户名或密码不正确' };
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa() {
    return 'aaa';
  }
  @Get('bbb')
  @UseGuards(LoginGuard)
  bbb() {
    return 'bbb';
  }
}
