import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return { message: 'User created', user: createUserDto };
  }

  findOne(id: string) {
    return { id, username: 'testuser' };
  }
}
