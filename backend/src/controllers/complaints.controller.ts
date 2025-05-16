import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComplaintsService } from '../services/complaints.service';
import { CreateComplaintDto } from '../dtos/complaints.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(id);
  }
}
