import {
  Get,
  SetMetadata,
  applyDecorators,
  UseGuards,
  createParamDecorator,
  type ExecutionContext,
  Controller,
} from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { Request } from 'express';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

export function Bbb(path, role) {
  return applyDecorators(Get(path), UseGuards(AaaGuard), Aaa(role));
}

export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc1';
  },
);

export const MyHeader = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.query[key] : request.query;
  },
);

export const Ddd = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('data', metadata));
};
