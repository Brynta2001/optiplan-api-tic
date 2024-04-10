import { faker } from '@faker-js/faker';
import { User } from 'src/auth/entities/user.entity';
import { mockAccount } from './accounts.mock';

export const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

export const mockUser: User = {
  id: faker.string.uuid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  department: 'IT',
  account: mockAccount,
  checkFieldsBeforeInsert: jest.fn(),
  checkFieldsBeforeUpdate: jest.fn(),
};
