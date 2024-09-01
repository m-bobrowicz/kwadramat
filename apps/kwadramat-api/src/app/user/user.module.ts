/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptModule } from '../encrypt/encrypt.module';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptModule],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
