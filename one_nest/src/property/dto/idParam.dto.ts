import { IsInt } from 'class-validator'
import { IsPositive } from 'class-validator'

export class IdParamDto {
  @IsInt()
  @IsPositive()
  id: number
}
