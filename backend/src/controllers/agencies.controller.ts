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
  @Public()
  // @Roles('SUPER_ADMIN')
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }

  @Get(':id')
  // @Roles('AGENCY_USER', 'SUPER_ADMIN')
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
  // @Roles('SUPER_ADMIN')
  @Public()
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  // @Roles('SUPER_ADMIN')
  @Public()
  remove(@Param('id') id: string) {
    return this.agenciesService.remove(id);
  }
}
