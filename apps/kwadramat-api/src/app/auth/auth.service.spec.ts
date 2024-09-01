import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthService,
  IncorrectPasswordError,
  UserNotFoundError,
} from './auth.service';
import { EncryptService } from '../encrypt/encrypt.service';
import { UserService } from '../user/user.service';

describe(AuthService.name, () => {
  let service: AuthService;

  let userService: { findOneByUsername: jest.Mock; updatePassword: jest.Mock };
  let jwtService: { sign: jest.Mock };
  let encrypt: { compare: jest.Mock };
  beforeEach(async () => {
    userService = { findOneByUsername: jest.fn(), updatePassword: jest.fn() };
    jwtService = { sign: jest.fn() };
    encrypt = { compare: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
        { provide: EncryptService, useValue: encrypt },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should login user', async () => {
    const token = 'this_is_a_jwt_token';
    jwtService.sign.mockReturnValue(token);
    const result = service.login({ username: 'someUsername', id: 123 });
    expect(result).toEqual({ token });
  });

  it('should validate user', async () => {
    const user = {
      username: 'someUsername',
      password: 'somePassword',
    };
    userService.findOneByUsername.mockImplementation((username) =>
      Promise.resolve(username === user.username ? user : null)
    );
    encrypt.compare.mockImplementation(
      (password) => password === user.password
    );

    expect(
      await service.validateUser('incorrect username', user.password)
    ).toEqual(null);
    expect(
      await service.validateUser(user.username, 'incorrect password')
    ).toEqual(null);
    expect(await service.validateUser(user.username, user.password)).toEqual(
      user
    );
  });

  describe('update password', () => {
    let user: { username: string; password: string };
    const newPassword = 'newPassword';

    beforeEach(() => {
      user = {
        username: 'someUsername',
        password: 'currentPassword',
      };
      userService.findOneByUsername.mockImplementation((username) =>
        Promise.resolve(username === user.username ? user : null)
      );
      encrypt.compare.mockImplementation(
        (password) => password === user.password
      );
    });

    it('should throw if user does not exist', async () => {
      expect(
        async () =>
          await service.changePassword({
            currentPassword: user.password,
            newPassword,
            username: 'non_existing_username',
          })
      ).rejects.toThrow(UserNotFoundError);
    });

    it('should throw if password is incorrect', async () => {
      expect(
        async () =>
          await service.changePassword({
            currentPassword: 'wrong_password',
            newPassword,
            username: user.username,
          })
      ).rejects.toThrow(IncorrectPasswordError);
    });

    it('should update password', async () => {
      userService.updatePassword.mockImplementation((data) => {
        user = {
          ...user,
          ...data,
        };
      });

      await service.changePassword({
        currentPassword: user.password,
        newPassword,
        username: user.username,
      });

      expect(user).toEqual({
        ...user,
        password: newPassword,
      });
    });
  });
});
