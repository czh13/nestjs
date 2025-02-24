import { Injectable } from '@nestjs/common';

const users = [
  {
    username: 'guangguang',
    githubId: '80755847',
    email: 'yyy@163.com',
    hobbies: ['sleep', 'writting'],
  },
  {
    username: 'dongdong',
    email: 'xxx@xx.com',
    hobbies: ['swimming'],
  },
];

@Injectable()
export class AppService {
  findUserByGighub(id: string) {
    return users.find((user) => user.githubId === id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
