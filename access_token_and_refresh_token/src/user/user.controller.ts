import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { loginDto } from './dto/Login.dio';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @InjectEntityManager()
  entityManager: EntityManager;

  @Inject(JwtService)
  jwtService: JwtService;

  @Get('refresh')
  async refreshToken(@Query('refesh_token') token) {
    try {
      const payload = await this.jwtService.verify(token);
      const foundUser = await this.userService.findUserById(payload.userId);
      if (!foundUser) {
        throw new UnauthorizedException('token失效');
      }
      const access_token = await this.jwtService.sign(
        {
          userId: foundUser.id,
          username: foundUser.username
        },
        { expiresIn: '30m' }
      );
      const refresh_token = this.jwtService.sign({ userId: foundUser.id }, { expiresIn: '7d' });
      return {
        refresh_token,
        access_token
      };
    } catch (e) {
      throw new UnauthorizedException('token失效');
    }
  }

  @Post('login')
  async login(@Body() loginUser: loginDto) {
    const foundUser = await this.userService.login(loginUser);

    if (!foundUser) {
      throw new HttpException('不存在', HttpStatus.ACCEPTED);
    }

    if (foundUser.password !== loginUser.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    const access_token = this.jwtService.sign(
      {
        userId: foundUser.id,
        username: foundUser.username
      },
      {
        expiresIn: '30m'
      }
    );

    const refresh_token = this.jwtService.sign({ userId: foundUser.id }, { expiresIn: '7d' });

    return {
      refresh_token,
      access_token
    };
  }

  @Post('singletoken')
  async singleToken(@Body() loginUser: loginDto) {
    const foundUser = await this.userService.login(loginUser);

    if (!foundUser) {
      throw new HttpException('不存在', HttpStatus.ACCEPTED);
    }

    if (foundUser.password !== loginUser.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    const token = this.jwtService.sign(
      {
        userId: foundUser.id,
        username: foundUser.username
      },
      {
        expiresIn: '30m'
      }
    );

    return {
      token
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
