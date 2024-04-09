export const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

export const mockUser = {
  id: 'e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c',
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
