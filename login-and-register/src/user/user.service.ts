import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import type { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto';
import type { LoginDto } from './dto/login.dto';
function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  private logger = new Logger();

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (foundUser) {
      throw new HttpException('Username already exists', 200);
    }
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('User not found', 200);
    }

    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('Password is incorrect', 200);
    }
    return foundUser;
  }
}
