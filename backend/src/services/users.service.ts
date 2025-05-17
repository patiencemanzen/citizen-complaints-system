import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel(createUserDto);
    return created.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.userModel.deleteOne({ _id: id }).exec();
    return { deleted: res.deletedCount > 0 };
  }
}
