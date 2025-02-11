import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { AaaDto } from './aaa.dto';

@Controller()
// @UseFilters(new HelloFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
    throw new BadRequestException('xxx');
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body(new ValidationPipe()) body: AaaDto) {
    throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
  }
}
