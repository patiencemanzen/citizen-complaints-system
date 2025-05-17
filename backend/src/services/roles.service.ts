// Roles service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/roles.dto';
import { Role } from '../schemas/roles.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const created = new this.roleModel(createRoleDto);
    return created.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, updateDto: UpdateRoleDto): Promise<Role> {
    const updated = await this.roleModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Role not found');
    return updated;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.roleModel.deleteOne({ _id: id }).exec();
    return { deleted: res.deletedCount > 0 };
  }
}
