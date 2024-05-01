import { Role } from 'src/auth/entities/role.entity';

export const mockRoleRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

export const mockRoles: Role[] = [
  {
    id: 2,
    name: 'business_manager',
    level: 1,
    account: null,
  },
  {
    id: 3,
    name: 'area_manager',
    level: 2,
    account: null,
  },
  {
    id: 3,
    name: 'area_leader',
    level: 3,
    account: null,
  },
];
