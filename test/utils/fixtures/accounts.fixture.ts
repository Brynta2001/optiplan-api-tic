import { faker } from '@faker-js/faker';
import { fixtureUsers } from './users.fixture';

export const fixtureAccounts = [
  {
    id: faker.string.uuid(),
    user: fixtureUsers[0],
    role: 'business_manager',
  },
  {
    id: faker.string.uuid(),
    user: fixtureUsers[1],
    role: 'area_manager',
  },
  {
    id: faker.string.uuid(),
    user: fixtureUsers[1],
    role: 'area_leader',
  },
  {
    id: faker.string.uuid(),
    user: fixtureUsers[2],
    role: 'technician',
  },
];
