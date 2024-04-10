import { faker } from '@faker-js/faker';
import { Account } from 'src/auth/entities/account.entity';
import { mockUser } from './users.mock';
import { mockRole } from './roles.mock';

export const mockAccountRepository = {
  find: jest.fn(),
};

export const mockAccount: Account = {
  id: faker.string.uuid(),
  user: mockUser,
  role: mockRole,
  projects: [],
  createdTasks: [],
  assignedTasks: [],
};

export const mockAccounts = [mockAccount, mockAccount];
