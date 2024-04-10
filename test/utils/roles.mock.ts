import { Role } from 'src/auth/entities/role.entity';
import { mockAccount } from './accounts.mock';

export const mockRoleRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

export const mockRole: Role = {
  id: 2,
  name: 'business_manager',
  level: 1,
  account: mockAccount,
};

export const mockLowerRoles: Role[] = [
  {
    id: 3,
    name: 'area_manager',
    level: 2,
    account: mockAccount,
  },
  {
    id: 3,
    name: 'area_leader',
    level: 3,
    account: mockAccount,
  },
];
