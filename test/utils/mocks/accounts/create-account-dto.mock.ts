import { faker } from '@faker-js/faker';
import { CreateAccountDto } from 'src/auth/dto';
import { fixtureDepartments } from '../../fixtures/departments.fixture';

export const mockCreateAccountDto: CreateAccountDto = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  fullName: faker.person.fullName(),
  department: faker.helpers.arrayElement(fixtureDepartments),
  roles: ['business_manager'],
};
