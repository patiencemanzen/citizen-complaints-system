/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Injectable,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgencyDto, UpdateAgencyDto } from '../dtos/agencies.dto';
import { UsersService } from './users.service';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectModel('Agency') private readonly agencyModel: Model<any>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(createAgencyDto: CreateAgencyDto) {
    const existingAgency = await this.agencyModel.findOne({
      contactEmail: createAgencyDto.contactEmail,
    });

    if (existingAgency) {
      throw new ConflictException('Agency email already exists');
    }

    const existingUser = await this.usersService.findByEmail(
      createAgencyDto.contactEmail,
    );

    if (existingUser) {
      throw new ConflictException('User email already exists');
    }

    const user = await this.usersService.create({
      username: createAgencyDto.name,
      email: createAgencyDto.contactEmail,
      password: createAgencyDto.userPassword,
      role: 'AGENCY_USER',
    });

    // Create agency and link to user
    const created = new this.agencyModel({
      name: createAgencyDto.name,
      description: createAgencyDto.description,
      contactEmail: createAgencyDto.contactEmail,
      userId: user._id,
      userPassword: createAgencyDto.userPassword,
    });

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
