import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserSeederService } from './user/user-seeder.service';
import { UserModule } from '../../app/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SeederService, UserSeederService],
  exports: [SeederService],
})
export class SeederModule {}
