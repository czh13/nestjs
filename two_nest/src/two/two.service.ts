import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  type BeforeApplicationShutdown,
  type OnApplicationShutdown,
  type OnModuleDestroy,
} from '@nestjs/common';
import { CreateTwoDto } from './dto/create-two.dto';
import { UpdateTwoDto } from './dto/update-two.dto';
import { OneService } from '../one/one.service';

@Injectable()
export class TwoService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private oneService: OneService) {}

  onModuleInit() {
    console.log('TwoService onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('TwoService onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('TwoService onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('TwoService beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('TwoService onApplicationShutdown');
  }

  create(createTwoDto: CreateTwoDto) {
    return 'This action adds a new two';
  }

  findAll() {
    return `This action returns all two +${this.oneService.findAll()}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} two`;
  }

  update(id: number, updateTwoDto: UpdateTwoDto) {
    return `This action updates a #${id} two`;
  }

  remove(id: number) {
    return `This action removes a #${id} two`;
  }
}
