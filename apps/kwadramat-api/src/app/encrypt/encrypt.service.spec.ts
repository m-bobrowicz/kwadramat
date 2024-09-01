const mockBcrypt = { genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() };
jest.mock('bcrypt', () => mockBcrypt);

import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto';
import { EncryptService } from './encrypt.service';

describe(EncryptService.name, () => {
  let service: EncryptService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = moduleRef.get<EncryptService>(EncryptService);
  });

  it('should encrypt password', async () => {
    mockBcrypt.genSalt.mockReturnValue('someSalt');
    mockBcrypt.hash.mockImplementation(
      (password, salt) => `${password}_${salt}`
    );
    const encryptedPassword = await service.encrypt('somePassword');
    expect(encryptedPassword).toEqual('somePassword_someSalt');
  });

  it('should compare password to hash', async () => {
    mockBcrypt.compare.mockImplementation(
      (password, hash) => password === 'somePassword' && hash === 'someHash'
    );

    const randomPassword = crypto.randomBytes(16).toString('hex');
    const randomHash = crypto.randomBytes(16).toString('hex');

    expect(await service.compare('somePassword', 'someHash')).toBeTruthy();
    expect(await service.compare(randomPassword, randomHash)).toBeFalsy();
  });
});
