/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      const created = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
        role: createUserDto.role || 'PUBLIC_USER',
      });
      return await created.save();
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictException('Username or email already exists');
      }
      throw err;
    }
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

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async setResetCode(email: string, code: string, expiry: Date): Promise<void> {
    await this.userModel
      .updateOne({ email }, { resetCode: code, resetCodeExpiry: expiry })
      .exec();
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userModel
      .updateOne(
        { email },
        { password: hashed, resetCode: null, resetCodeExpiry: null },
      )
      .exec();
  }
}
