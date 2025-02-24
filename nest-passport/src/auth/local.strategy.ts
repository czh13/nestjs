import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { AuthService } from './auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
