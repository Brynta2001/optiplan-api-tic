import { faker } from '@faker-js/faker';

export const fixtureStates = [
  {
    id: faker.string.uuid(),
    name: 'To Do',
    sequence: 1,
  },
  {
    id: faker.string.uuid(),
    name: 'In Progress',
    sequence: 2,
  },
  {
    id: faker.string.uuid(),
    name: 'Done',
    sequence: 3,
  },
];
