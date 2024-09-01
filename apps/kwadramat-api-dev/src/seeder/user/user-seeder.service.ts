import { Injectable } from '@nestjs/common';
import { User } from '../../../../kwadramat-api/src/app/user/user.entity';
import { UserService } from '../../../../kwadramat-api/src/app/user/user.service';

type UserData = Pick<User, 'username' | 'firstName' | 'lastName'> & {
  password: string;
};
@Injectable()
export class UserSeederService {
  private readonly USERS = {
    ADMIN: {
      username: 'admin',
      password: 'Abcd1234',
      firstName: 'Adam',
      lastName: 'Nowak',
    },
  };

  async create(): Promise<void> {
    await this.createIfNotExists(this.USERS.ADMIN);
  }

  private async createIfNotExists(userData: UserData) {
    await this.userService.create(userData);
  }

  constructor(private userService: UserService) {}
}
