import { Injectable, Logger } from '@nestjs/common';
import { UserSeederService } from './user/user-seeder.service';

@Injectable()
export class SeederService {
  async seed() {
    this.logger.debug('Seeding started');
    await this.userSeederService
      .create()
      .then(() => {
        this.logger.debug('Successfuly seeded users');
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        throw error;
      });
    this.logger.debug('Seeding finished');
  }

  constructor(private readonly userSeederService: UserSeederService) {}

  private readonly logger = new Logger(SeederService.name);
}
