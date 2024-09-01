/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthHttpFilter } from './auth/auth-http.filter';
import { AuthModule } from './auth/auth.module';
import { loadConfiguration } from './config/config';
import { UserModule } from './user/user.module';

const configuration = loadConfiguration();

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ load: [loadConfiguration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.database.host,
      port: configuration.database.port,
      username: configuration.database.user,
      password: configuration.database.password,
      database: configuration.database.dbName,
      autoLoadEntities: true,
      synchronize: false,
      dropSchema: false,
    }),
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: configuration.http.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UserModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AuthHttpFilter }],
})
export class AppModule {}
