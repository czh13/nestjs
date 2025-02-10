import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('before2', req.url);
    next();
    console.log('after2');
  }
}
