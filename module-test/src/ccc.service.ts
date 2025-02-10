import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DddService } from './ddd.service';

@Injectable()
export class CccService {
  constructor(
    @Inject(forwardRef(() => DddService))
    private readonly dddService: DddService,
  ) {}

  ccc() {
    return this.dddService.ddd() + 'ccc';
  }
}
