import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { AppService } from './app.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  // constructor(private readonly appService: AppService) {}
  @Inject(AppService)
  private readonly appService: AppService;

  use(req: Request, res: Response, next: NextFunction) {
    console.log('before');
    next();
    console.log('after');
    console.log(this.appService.getHello());
  }
}
