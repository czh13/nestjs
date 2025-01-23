import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  type OnModuleDestroy,
  type BeforeApplicationShutdown,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { CreateOneDto } from './dto/create-one.dto';
import { UpdateOneDto } from './dto/update-one.dto';

@Injectable()
export class OneService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleDestroy() {
    console.log('OneService onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('OneService beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('OneService onApplicationShutdown');
  }

  onModuleInit() {
    console.log('OneService onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('OneService onApplicationBootstrap');
  }

  create(createOneDto: CreateOneDto) {
    return 'This action adds a new one';
  }

  findAll() {
    return `This action returns all one`;
  }

  findOne(id: number) {
    return `This action returns a #${id} one`;
  }

  update(id: number, updateOneDto: UpdateOneDto) {
    return `This action updates a #${id} one`;
  }

  remove(id: number) {
    return `This action removes a #${id} one`;
  }
}
