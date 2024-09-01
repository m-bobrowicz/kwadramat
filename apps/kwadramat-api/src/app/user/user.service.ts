import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from '../encrypt/encrypt.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ username });
  }

  async create(data: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<void> {
    const hash = await this.encryptService.encrypt(data.password);
    await this.userRepository.save(
      User.of({
        username: data.username,
        hash,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    );
  }

  async updatePassword(data: {
    username: string;
    password: string;
  }): Promise<void> {
    const hash = await this.encryptService.encrypt(data.password);
    await this.userRepository.update(
      { username: data.username },
      User.of({
        username: data.username,
        hash,
      })
    );
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(EncryptService) private encryptService: EncryptService
  ) {}
}
