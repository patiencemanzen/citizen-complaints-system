// Roles service
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dtos/roles.dto';

@Injectable()
export class RolesService {
  create(createRoleDto: CreateRoleDto) {
    return { message: 'Role created', role: createRoleDto };
  }

  findOne(id: string) {
    return { id, name: 'Sample Role' };
  }
}
