import { faker } from '@faker-js/faker';

export const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

export const mockUser = {
  id: faker.string.uuid(),
  fullName: 'John Doe',
  email: 'bryan.tapia03@epn.edu.ec',
  password: '$2b$10$7ZHhHiXx',
  roles: ['area_manager'],
  department: 'IT',
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  },
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  },
};
