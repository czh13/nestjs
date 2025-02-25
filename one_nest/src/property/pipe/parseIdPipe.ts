import { BadRequestException, type ArgumentMetadata, type PipeTransform } from '@nestjs/common'

export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed')
    }
    return val
  }
}
