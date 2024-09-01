import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EncryptService } from '../encrypt/encrypt.service';
import { User } from './user.entity';
import { UserService } from './user.service';

describe(UserService.name, () => {
  let service: UserService;

  let users: Record<string, User>;
  let repository: {
    findOneByOrFail: jest.Mock;
    save: jest.Mock;
    update: jest.Mock;
  };
  let encrypt: { encrypt: jest.Mock };

  beforeEach(async () => {
    users = {
      A: { id: '1', username: 'A' } as User,
    };
    repository = {
      findOneByOrFail: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };
    encrypt = {
      encrypt: jest.fn(),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EncryptService, useValue: encrypt },
        { provide: getRepositoryToken(User), useValue: repository },
        UserService,
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  it('should find user by username from repository', async () => {
    repository.findOneByOrFail.mockReturnValue(Promise.resolve(users.A));

    const user = await service.findOneByUsername('A');
    expect(user).toEqual(users.A);
  });

  it('should return null if user is not in repository', async () => {
    repository.findOneByOrFail.mockReturnValue(null);

    const user = await service.findOneByUsername('A');
    expect(user).toEqual(null);
  });

  it('should create a user', async () => {
    repository.findOneByOrFail.mockImplementation(({ username }) =>
      Promise.resolve(
        Object.values(users).find((it) => it.username === username)
      )
    );
    repository.save.mockImplementation((data) => {
      users[data.username] = data;
    });

    const hash = 'this_is_a_hash';
    encrypt.encrypt.mockReturnValue(Promise.resolve(hash));

    const newUser = {
      password: 'somePassword',
      username: 'someUsername',
      firstName: 'Tom',
      lastName: 'Nook',
    };

    await service.create(newUser);

    const user = await service.findOneByUsername(newUser.username);
    expect(user).toEqual({
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      hash,
    });
  });

  it('should update users password', async () => {
    repository.findOneByOrFail.mockImplementation(({ username }) =>
      Promise.resolve(
        Object.values(users).find((it) => it.username === username)
      )
    );
    repository.update.mockImplementation(({ username }, data) => {
      users[data.username] = { ...users[username], hash: data.hash };
    });

    const hash = 'new_hash';
    encrypt.encrypt.mockReturnValue(Promise.resolve(hash));

    const existingUser = {
      hash: 'original_hash',
      username: 'someUsername',
      firstName: 'Tom',
      lastName: 'Nook',
    } as User;
    users[existingUser.username] = existingUser;

    await service.updatePassword({
      username: existingUser.username,
      password: 'new_password',
    });

    const user = await service.findOneByUsername(existingUser.username);
    expect(user).toEqual({
      username: existingUser.username,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      hash,
    });
  });
});
