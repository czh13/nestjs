/*
https://docs.nestjs.com/providers#services
*/

import { LoggerService } from '@nestjs/common';

export class MyloggerService implements LoggerService {
  log(message: string, context: string) {
    console.log(`---log---[${context}]---`, message);
  }
  error(message: string, context: string) {
    console.log(`---error---[${context}]---`, message);
  }
  warn(message: string, context: string) {
    console.log(`---warn---[${context}]---`, message);
  }
}
