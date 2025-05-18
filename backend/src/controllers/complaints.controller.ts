import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ComplaintsService } from '../services/complaints.service';
import {
  CreateComplaintDto,
  UpdateComplaintDto,
  AddCommentDto,
} from '../dtos/complaints.dto';
// import { Roles } from '../utilities/roles.decorator';
import { Public } from 'src/utilities/public.decorator';
import { JwtAuthGuard } from '../utilities/jwt-auth.guard';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  // @Roles('PUBLIC_USER', 'AGENCY_USER', 'SUPER_ADMIN')
  async create(
    @Body() dto: CreateComplaintDto,
    @Req() req: Record<string, any>,
  ) {
    const user = req?.user as { userId?: string };
    if (!user || typeof user.userId !== 'string') {
      throw new Error('User ID not found in request');
    }
    return this.complaintsService.create(dto, user.userId);
  }

  @Get()
  // @Roles('AGENCY_USER', 'SUPER_ADMIN')
  @Public()
  async findAll() {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(id);
  }

  @Put(':id')
  // @Roles('AGENCY_USER', 'SUPER_ADMIN')
  @Public()
  async update(@Param('id') id: string, @Body() dto: UpdateComplaintDto) {
    return this.complaintsService.update(id, dto);
  }

  @Delete(':id')
  // @Roles('SUPER_ADMIN')
  @Public()
  async delete(@Param('id') id: string) {
    return this.complaintsService.delete(id);
  }

  @Get('user/:userId')
  // @Roles('PUBLIC_USER', 'SUPER_ADMIN')
  @Public()
  async findByUserId(@Param('userId') userId: string) {
    return this.complaintsService.findByUserId(userId);
  }

  @Get('agency/:agencyId')
  // @Roles('AGENCY_USER', 'SUPER_ADMIN')
  @Public()
  async findByAgencyId(@Param('agencyId') agencyId: string) {
    return this.complaintsService.findByAgencyId(agencyId);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Param('id') id: string,
    @Body() dto: AddCommentDto,
    @Req() req: Record<string, any>,
  ) {
    const user = req?.user as { userId?: string };
    if (!user || typeof user.userId !== 'string') {
      throw new Error('User ID not found in request');
    }
    return this.complaintsService.addComment(id, user.userId, dto.text);
  }
}
