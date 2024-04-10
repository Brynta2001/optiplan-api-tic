import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Role } from './entities/role.entity';
import {
  mockAccountRepository,
  mockRole,
  mockRoleRepository,
  mockUserRepository,
} from '../../test/utils';

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

  it('TEST-2 should return users with lower roles', async () => {
    const users = await authService.getUsersWithLowerRole(mockRole);
    expect(users).toBeDefined();
  });

  //   it('should not login if credentials are invalid', async () => {
  //     const user = {
  //       email: 'bryan.tapia03@epn.edu.ec',
  //       password: 'Bryan',
  //       role: 'area_manager',
  //     };
  //     try {
  //       await authService.login(user);
  //     } catch (error) {
  //       expect(error.status.code).toEqual(401);
  //       expect(error.message).toEqual('Credentials are not valid');
  //     }
  //   });
});
