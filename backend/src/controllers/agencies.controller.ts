import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AgenciesService } from '../services/agencies.service';
import { CreateAgencyDto, UpdateAgencyDto } from '../dtos/agencies.dto';
// import { Roles } from '../utilities/roles.decorator';
import { Public } from 'src/utilities/public.decorator';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Post()
  // @Roles('ADMIN')
  @Public()
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }

  @Get(':id')
  // @Roles('AGENCY_USER', 'ADMIN')
  @Public()
  findOne(@Param('id') id: string) {
    return this.agenciesService.findOne(id);
  }

  @Get()
  @Public()
  findAll() {
    return this.agenciesService.findAll();
  }

  @Put(':id')
  @Public()
  // @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  @Public()
  // @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.agenciesService.remove(id);
  }
}
