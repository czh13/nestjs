import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  async init() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session) {
    session.user = {
      username: loginDto.username,
    };
    await this.userService.login(loginDto);
    return 'success';
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
