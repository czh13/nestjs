import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  type OnModuleDestroy,
  type BeforeApplicationShutdown,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { OneService } from './one.service';
import { CreateOneDto } from './dto/create-one.dto';
import { UpdateOneDto } from './dto/update-one.dto';

@Controller('one')
export class OneController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly oneService: OneService) {}

  onModuleDestroy() {
    console.log('OneController onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('OneController beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('OneController onApplicationShutdown');
  }

  onModuleInit() {
    console.log('OneController onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('OneController onApplicationBootstrap');
  }

  @Post()
  create(@Body() createOneDto: CreateOneDto) {
    return this.oneService.create(createOneDto);
  }

  @Get()
  findAll() {
    return this.oneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOneDto: UpdateOneDto) {
    return this.oneService.update(+id, updateOneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oneService.remove(+id);
  }
}
