/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { loadConfiguration } from '../config/config';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserModule } from '../user/user.module';

const config = loadConfiguration();

@Module({
  imports: [
    UserModule,
    EncryptModule,
    ConfigModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: config.http.jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
