import { faker } from '@faker-js/faker';
import { Account } from 'src/auth/entities/account.entity';
import { mockUsers } from './users.mock';
import { mockRoles } from './roles.mock';

export const mockAccountRepository = {
  find: jest.fn(),
};

// export const mockAccount: Account = {
//   id: faker.string.uuid(),
//   user: mockUser,
//   role: mockRole,
//   projects: [],
//   createdTasks: [],
//   assignedTasks: [],
// };

export const mockAccounts: Account[] = [
  {
    id: faker.string.uuid(),
    user: mockUsers[0],
    role: mockRoles[0],
    projects: [],
    createdTasks: [],
    assignedTasks: [],
  },
  {
    id: faker.string.uuid(),
    user: mockUsers[1],
    role: mockRoles[1],
    projects: [],
    createdTasks: [],
    assignedTasks: [],
  },
];
