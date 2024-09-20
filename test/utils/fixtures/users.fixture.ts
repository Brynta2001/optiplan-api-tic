import { faker } from '@faker-js/faker';
import { fixtureDepartments } from './departments.fixture';

export const fixtureUsers = [
  {
    email: 'roberto.garcia@optiplan.com',
    password: 'Roberto1234',
    fullName: 'Roberto García',
    department: faker.helpers.arrayElement(fixtureDepartments),
  },
  {
    email: 'maria.rodriguez@optiplan.com',
    password: 'Maria1234',
    fullName: 'Maria Rodríguez',
    department: faker.helpers.arrayElement(fixtureDepartments),
  },
  {
    email: 'sarah.gonzales@epn.edu.ec',
    password: 'Sarah1234',
    fullName: 'Sarah Gonzáles',
    department: faker.helpers.arrayElement(fixtureDepartments),
  },
];
