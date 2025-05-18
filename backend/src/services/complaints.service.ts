import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateComplaintDto, UpdateComplaintDto } from '../dtos/complaints.dto';
import { Complaint } from '../schemas/complaints.schema';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel('Complaint') private readonly complaintModel: Model<Complaint>,
  ) {}

  async create(
    createComplaintDto: CreateComplaintDto,
    userId: string,
  ): Promise<Complaint> {
    const created = new this.complaintModel({ ...createComplaintDto, userId });
    return created.save();
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.find().exec();
  }

  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintModel.findById(id).exec();
    if (!complaint) throw new NotFoundException('Complaint not found');
    return complaint;
  }

  async update(id: string, updateDto: UpdateComplaintDto): Promise<Complaint> {
    const updated = await this.complaintModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Complaint not found');
    return updated;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.complaintModel.deleteOne({ _id: id }).exec();
    return { deleted: res.deletedCount > 0 };
  }

  async findByUserId(userId: string): Promise<Complaint[]> {
    return this.complaintModel.find({ userId }).exec();
  }

  async findByAgencyId(agencyId: string): Promise<Complaint[]> {
    return this.complaintModel.find({ agencyId }).exec();
  }
}
