import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnApplicationBootstrap,
  OnModuleInit,
  type OnModuleDestroy,
  type BeforeApplicationShutdown,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { TwoService } from './two.service';
import { CreateTwoDto } from './dto/create-two.dto';
import { UpdateTwoDto } from './dto/update-two.dto';

@Controller('two')
export class TwoController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly twoService: TwoService) {}

  onModuleDestroy() {
    console.log('TwoController onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('TwoController beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('TwoController onApplicationShutdown');
  }

  onModuleInit() {
    console.log('TwoController onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('TwoController onApplicationBootstrap');
  }

  @Post()
  create(@Body() createTwoDto: CreateTwoDto) {
    return this.twoService.create(createTwoDto);
  }

  @Get()
  findAll() {
    return this.twoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.twoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTwoDto: UpdateTwoDto) {
    return this.twoService.update(+id, updateTwoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.twoService.remove(+id);
  }
}
