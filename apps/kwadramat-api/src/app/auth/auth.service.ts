import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../encrypt/encrypt.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user == null) {
      return null;
    }
    if (await this.encryptService.compare(password, user.hash)) {
      return user;
    }
    return null;
  }

  login(user: { id: number; username: string }) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async changePassword(payload: {
    username: string;
    currentPassword: string;
    newPassword: string;
  }) {
    const { username, currentPassword, newPassword } = payload;
    const user = await this.usersService.findOneByUsername(username);
    if (user == null) {
      throw new UserNotFoundError(username);
    }
    const isPasswordCorrect = await this.encryptService.compare(
      currentPassword,
      user.hash
    );
    if (isPasswordCorrect) {
      await this.usersService.updatePassword({
        username,
        password: newPassword,
      });
      return null;
    }
    throw new IncorrectPasswordError();
  }

  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    private encryptService: EncryptService
  ) {}
}

export class UserNotFoundError extends Error {
  constructor(username: string) {
    super(`user with username ${username} not found`);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super(`password is incorrect`);
    Object.setPrototypeOf(this, IncorrectPasswordError.prototype);
  }
}
