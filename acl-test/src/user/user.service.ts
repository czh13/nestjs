import { HttpException, Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import type { EntityManager } from 'typeorm';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async findUser(username: string) {
    const foundUser = await this.entityManager.findOne(User, {
      where: {
        username,
      },
      relations: {
        permissions: true,
      },
    });
    return foundUser;
  }

  async login(user: LoginDto) {
    const foundUser = await this.entityManager.findOneBy(User, {
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('用户不存在', 200);
    }

    if (foundUser.passwrod !== user.password) {
      throw new HttpException('密码错误', 200);
    }
  }

  async initData() {
    const permission1 = new Permission();
    permission1.name = 'creat_aaa';
    permission1.desc = '创建aaa';
    const permission2 = new Permission();
    permission2.name = 'update_aaa';
    permission2.desc = '更新aaa';
    const permission3 = new Permission();
    permission3.name = 'delete_aaa';
    permission3.desc = '删除aaa';
    const permission4 = new Permission();
    permission4.name = 'query_aaa';
    permission4.desc = '查询aaa';

    const permission5 = new Permission();
    permission5.name = 'creat_bbb';
    permission5.desc = '创建bbb';
    const permission6 = new Permission();
    permission6.name = 'update_bbb';
    permission6.desc = '更新bbb';
    const permission7 = new Permission();
    permission7.name = 'delete_bbb';
    permission7.desc = '删除_bbb';
    const permission8 = new Permission();
    permission8.name = 'query_bbb';
    permission8.desc = '查询bbb';

    const user1 = new User();
    user1.username = '东东';
    user1.passwrod = 'aaaaa';
    user1.permissions = [permission1, permission2, permission4, permission3];

    const user2 = new User();
    user2.username = '观光';
    user2.passwrod = 'bbbbbb';
    user2.permissions = [permission5, permission6, permission7, permission8];
    await this.entityManager.save(Permission, [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);
    await this.entityManager.save(User, [user1, user2]);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
