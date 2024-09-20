import { LoginAccountDto } from 'src/auth/dto';

enum AccountKey {
  BUSINESS_MANAGER = 'BUSINESS_MANAGER',
  AREA_MANAGER = 'AREA_MANAGER',
  AREA_LEADER = 'AREA_LEADER',
  TECHNICIAN = 'TECHNICIAN',
}

export const mockLoginAccountDto: { [key in AccountKey]: LoginAccountDto } = {
  // Business Manager
  [AccountKey.BUSINESS_MANAGER]: {
    email: 'roberto.garcia@optiplan.com',
    password: 'Roberto1234',
    role: 'business_manager',
  },
  // Area Manager
  [AccountKey.AREA_MANAGER]: {
    email: 'maria.rodriguez@optiplan.com',
    password: 'Maria1234',
    role: 'area_manager',
  },
  // Area Leader
  [AccountKey.AREA_LEADER]: {
    email: 'maria.rodriguez@optiplan.com',
    password: 'Maria1234',
    role: 'area_leader',
  },
  // Technician
  [AccountKey.TECHNICIAN]: {
    email: 'sarah.gonzales@epn.edu.ec',
    password: 'Sarah1234',
    role: 'technician',
  },
};
