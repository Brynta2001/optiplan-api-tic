import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Role } from './entities/role.entity';
import {
  mockAccountRepository,
  mockRoles,
  mockAccounts,
  mockRoleRepository,
  mockUserRepository,
} from '../../test/utils/mocks';

describe('AuthService', () => {
  let authService: AuthService;

  const accountRepositoryToken = getRepositoryToken(Account);
  const userRepositoryToken = getRepositoryToken(User);
  const roleRepositoryToken = getRepositoryToken(Role);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        AuthService,
        {
          provide: accountRepositoryToken,
          useValue: mockAccountRepository,
        },
        {
          provide: userRepositoryToken,
          useValue: mockUserRepository,
        },
        {
          provide: roleRepositoryToken,
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('TEST-2 should return users with lower roles', async () => {
    jest.spyOn(mockRoleRepository, 'findOne').mockReturnValue(mockRoles[0]);
    jest.spyOn(mockAccountRepository, 'find').mockReturnValue(mockAccounts);

    const users = await authService.getUsersWithLowerRole(mockRoles[0]);

    expect(mockAccountRepository.find).toHaveBeenCalled();
    expect(mockRoleRepository.findOne).toHaveBeenCalled();
    expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
      where: { level: mockRoles[0].level + 1 },
    });
    expect(users).toHaveLength(2);
    expect(users).toEqual([mockAccounts[0].user, mockAccounts[1].user]);
  });

  it('TEST-3 should not create a user with an invalid role', async () => {
    const accountDto = {
      email: 'bryan.tapia03@epn.edu.ec',
      password: 'Bryan1234',
      fullName: 'Bryan Tapia',
      roles: ['analyst'],
      department: 'IT',
    };

    jest.spyOn(mockRoleRepository, 'find').mockReturnValue([]);

    try {
      await authService.create(accountDto);
    } catch (error) {
      expect(error.message).toEqual('Roles are not valid');
      expect(error.status).toEqual(400);
    }
  });
});
