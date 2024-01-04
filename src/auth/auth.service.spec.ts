import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token', () => {
    const user = {
      email: 'bryan.tapia03@epn.edu.ec',
      password: 'Bryan1234',
      role: 'area_manager',
    };
    const token = service.login(user);
    expect(token).toBeDefined();
  });

  it('should not login if credentials are invalid', async () => {
    const user = {
      email: 'bryan.tapia03@epn.edu.ec',
      password: 'Bryan',
      role: 'area_manager',
    };
    try {
      await service.login(user);
    } catch (error) {
      expect(error.status.code).toEqual(401);
      expect(error.message).toEqual('Credentials are not valid');
    }
  });

});
