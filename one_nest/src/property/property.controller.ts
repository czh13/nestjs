import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import type { CreatePropertyDto } from './dto/createProperty.dto'
import type { IdParamDto } from './dto/idParam.dto'
import { ParseIdPipe } from './pipe/parseIdPipe'

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'property'
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string, @Query('sort', ParseBoolPipe) sort: boolean) {
    return `property id ${id} ${typeof id} sort ${sort} ${typeof sort}`
  }

  // @Get('all/:id/:name')
  // findObject(@Param() id) {
  //   return id
  // }

  // @Get('all/:id/:name')
  // findObject(@Param('id') id: string, @Param('name') name: string) {
  //   return `${id}-${name}`
  // }

  @Post('create')
  // @HttpCode(202)
  // @UsePipes(new ValidationPipe({ whitelist: true, groups: ['create'], always: true }))
  create(@Body() body: CreatePropertyDto) {
    return body
  }

  @Patch('update/:id')
  // update(@Param() param: IdParamDto, @Body() body: CreatePropertyDto) {
  update(@Param('id', ParseIdPipe) param: IdParamDto, @Body() body: CreatePropertyDto) {
    console.log('🚀 ~ PropertyController ~ update ~ param:', param)

    return { param, body }
  }
}
