import { Module } from '@nestjs/common';
import { ComplaintsService } from '../services/complaints.service';
import { ComplaintsController } from '../controllers/complaints.controller';

@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  exports: [ComplaintsService],
})
export class ComplaintsModule {}
