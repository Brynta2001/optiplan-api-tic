export const mockRoleRepository = {
  find: jest.fn(),
};

export const mockRole = {
  id: 2,
  name: 'area_manager',
};

export const mockRoles = [
  {
    id: 1,
    name: 'business_manager',
    level: 1,
  },
  {
    id: 2,
    name: 'area_manager',
    level: 2,
  },
];
