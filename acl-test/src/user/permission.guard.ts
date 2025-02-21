import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisClient: RedisService;

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session.user;

    if (!user) {
      throw new UnauthorizedException('未登录');
    }

    let permissions = await this.redisClient.listGet(
      `user_${user.username}_permissions`,
    );

    if (!permissions.length) {
      const currentUser = await this.userService.findUser(user.username);
      console.log(
        '🚀 ~ PermissionGuard ~ canActivate ~ currentUser:',
        currentUser,
      );
      permissions =
        currentUser?.permissions.map((permission) => permission.name) || [];

      await this.redisClient.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }

    const permission = this.reflector.get('permission', context.getHandler());
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ permission:', permission);

    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('无权限');
    }
  }
}
