import { faker } from '@faker-js/faker';
import { User } from 'src/auth/entities/user.entity';

class MockUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  department: string;
  account: any;
  checkFieldsBeforeInsert: any;
  checkFieldsBeforeUpdate: any;

  constructor(department: string) {
    this.id = faker.string.uuid();
    this.fullName = faker.person.fullName();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.department = department;
    this.account = null;
    this.checkFieldsBeforeInsert = jest.fn();
    this.checkFieldsBeforeUpdate = jest.fn();
  }
}

export const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

export const mockUsers: User[] = [new MockUser('IT'), new MockUser('IT')];
