import { PartialType } from '@nestjs/mapped-types';
import { CreateTwoDto } from './create-two.dto';

export class UpdateTwoDto extends PartialType(CreateTwoDto) {}
