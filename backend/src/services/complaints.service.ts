import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from '../dtos/complaints.dto';

@Injectable()
export class ComplaintsService {
  create(createComplaintDto: CreateComplaintDto) {
    return { message: 'Complaint created', complaint: createComplaintDto };
  }

  findOne(id: string) {
    return { id, description: 'Sample complaint' };
  }
}
