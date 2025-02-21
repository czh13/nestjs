import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
import type { Request } from 'express';
import type { Permission } from './user/entities/permission.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  reflector: Reflector;

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }
    const roles = await this.userService.findRolesByIds(request.user.roles.map((role) => role.id));
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ roles:', roles);

    const permissions: Permission[] = roles.flatMap((item) => item.permissions);
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ permissions:', permissions);

    const RequirePermissions: string[] = this.reflector.getAllAndOverride('require-permission', [
      context.getClass(),
      context.getHandler()
    ]);
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ RequirePermissions:', RequirePermissions);

    const all = permissions.map((per) => per.name);
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ all:', all);

    const isPass = RequirePermissions.some((cur) => all.includes(cur));
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ isPass:', isPass);

    if (!isPass) {
      throw new UnauthorizedException('没有权限');
    }

    return true;
  }
}
