/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class AaaException extends HttpException {
  constructor(
    public aaa: string,
    public bbb: string,
  ) {
    super(aaa, HttpStatus.I_AM_A_TEAPOT);
  }
}
