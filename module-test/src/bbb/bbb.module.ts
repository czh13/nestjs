import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => BbbModule)],
})
export class BbbModule {}
