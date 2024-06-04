import { faker } from '@faker-js/faker';
import { User } from 'src/auth/entities/user.entity';
import { fixtureDepartments } from '../fixtures/departments.fixture';

class MockUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  department: string;
  account: any;
  checkFieldsBeforeInsert: any;
  checkFieldsBeforeUpdate: any;

  constructor() {
    this.id = faker.string.uuid();
    this.fullName = faker.person.fullName();
    this.email = faker.internet.email().toLowerCase();
    this.password = faker.internet.password();
    this.department = faker.helpers.arrayElement(fixtureDepartments);
    this.account = null;
    this.checkFieldsBeforeInsert = jest.fn();
    this.checkFieldsBeforeUpdate = jest.fn();
  }
}

export const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

export const mockUsers: User[] = [
  new MockUser(),
  new MockUser(),
  new MockUser(),
  new MockUser(),
  new MockUser(),
];
