import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  jwtService: JwtService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = await this.jwtService.verify(token);

      const expTimestamp = dayjs(data.exp).format('YYYY-MM-DD HH:mm:ss');
      const isExpired = dayjs().add(5, 'minute').isAfter(expTimestamp);
      if (isExpired) {
        response.setHeader('token', this.jwtService.sign({ userId: data.userId, username: data.username }));
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('token失效');
    }
  }
}
