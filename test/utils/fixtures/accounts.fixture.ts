import { fixtureUsers } from '../users.fixture';

export const fixtureAccounts = [
  {
    user: fixtureUsers[0],
    role: 'business_manager',
  },
  {
    user: fixtureUsers[1],
    role: 'area_manager',
  },
  {
    user: fixtureUsers[1],
    role: 'area_leader',
  },
  {
    user: fixtureUsers[2],
    role: 'technician',
  },
];
