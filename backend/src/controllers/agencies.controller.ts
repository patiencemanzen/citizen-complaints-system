import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AgenciesService } from '../services/agencies.service';
import { CreateAgencyDto } from '../dtos/agencies.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Post()
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agenciesService.findOne(id);
  }
}
