import { PartialType } from '@nestjs/mapped-types';
import { CreateOneDto } from './create-one.dto';

export class UpdateOneDto extends PartialType(CreateOneDto) {}
