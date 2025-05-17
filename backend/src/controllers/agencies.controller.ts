import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AgenciesService } from '../services/agencies.service';
import { CreateAgencyDto } from '../dtos/agencies.dto';
import { Roles } from '../utilities/roles.decorator';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Post()
  @Roles('SUPER_ADMIN')
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }

  @Get(':id')
  @Roles('AGENCY_USER', 'SUPER_ADMIN')
  findOne(@Param('id') id: string) {
    return this.agenciesService.findOne(id);
  }
}
