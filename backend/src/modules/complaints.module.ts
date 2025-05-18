import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsService } from '../services/complaints.service';
import { ComplaintsController } from '../controllers/complaints.controller';
import { ComplaintSchema } from '../schemas/complaints.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Complaint', schema: ComplaintSchema }]),
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  exports: [ComplaintsService],
})
export class ComplaintsModule {}
