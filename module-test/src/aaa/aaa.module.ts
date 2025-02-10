import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => AaaModule)],
})
export class AaaModule {}
