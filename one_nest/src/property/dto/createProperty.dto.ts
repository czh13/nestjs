import { IsInt, IsPositive, IsString, Length } from 'class-validator'

export class CreatePropertyDto {
  @IsString()
  @Length(3, 20, { groups: ['create'] })
  @Length(3, 10, { groups: ['update'] })
  name: string

  @IsInt()
  @IsPositive()
  price: number

  @IsString()
  description: string
}
