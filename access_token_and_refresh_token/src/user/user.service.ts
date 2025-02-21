import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import type { loginDto } from './dto/Login.dio';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async findUserById(userId: number) {
    const foundUser = await this.entityManager.findOne(User, {
      where: { id: userId }
    });
    return foundUser;
  }

  async login(loginUser: loginDto) {
    const foundUser = await this.entityManager.findOne(User, {
      where: {
        username: loginUser.username
      }
    });

    return foundUser;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
