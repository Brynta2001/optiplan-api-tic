import * as bcrypt from 'bcrypt';

export const initialData = {
  accounts: [
    // Admin
    {
      email: 'alejandro.martinez@optiplan.com',
      password: bcrypt.hashSync('Alejandro1234', 10),
      fullName: 'Alejandro Martínez',
      roles: ['admin'],
      department: 'TI',
    },
    // Business Manager
    {
      email: 'roberto.garcia@optiplan.com',
      password: bcrypt.hashSync('Roberto1234', 10),
      fullName: 'Roberto García',
      roles: ['business_manager'],
      department: 'TI',
    },
    // Area Manager
    {
      email: 'maria.rodriguez@optiplan.com',
      password: bcrypt.hashSync('Maria1234', 10),
      fullName: 'Maria Rodríguez',
      roles: ['area_manager', 'area_leader'],
      department: 'TI',
    },
    // Area Leader
    {
      email: 'carlos.iniguez@optiplan.com',
      password: bcrypt.hashSync('Carlos1234', 10),
      fullName: 'Carlos Iñiguez',
      roles: ['area_leader'],
      department: 'TI',
    },
    // Technician
    {
      email: 'sarah.gonzales@epn.edu.ec',
      password: bcrypt.hashSync('Sarah1234', 10),
      fullName: 'Sarah Gonzáles',
      roles: ['technician'],
      department: 'TI',
    },
  ],

  roles: [
    {
      name: 'admin',
      level: 0,
    },
    {
      name: 'business_manager',
      level: 1,
    },
    {
      name: 'area_manager',
      level: 2,
    },
    {
      name: 'area_leader',
      level: 3,
    },
    {
      name: 'technician',
      level: 4,
    },
  ],

  boards: [
    {
      name: 'Progress Board',
      description: 'This is a board to track the progress of the activities',
      columns: 3,
    },
  ],
};
