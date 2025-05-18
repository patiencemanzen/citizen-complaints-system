/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgencyDto, UpdateAgencyDto } from '../dtos/agencies.dto';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectModel('Agency') private readonly agencyModel: Model<any>,
  ) {}

  async create(createAgencyDto: CreateAgencyDto) {
    const created = new this.agencyModel(createAgencyDto);
    return await created.save();
  }

  async findAll() {
    return await this.agencyModel.find().exec();
  }

  async findOne(id: string) {
    return await this.agencyModel.findById(id).exec();
  }

  async update(id: string, updateAgencyDto: UpdateAgencyDto) {
    return await this.agencyModel
      .findByIdAndUpdate(id, updateAgencyDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.agencyModel.findByIdAndDelete(id).exec();
  }
}
