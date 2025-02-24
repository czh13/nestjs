import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码不正确');
    }
    const { password, ...result } = user;
    return result;
  }
}
