import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto';
import { Auth, GetAccount } from './decorators';
import { ValidRoles } from './interfaces/roles.interface';
import { Account } from './entities/account.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  @Post('register')
  //@Auth(ValidRoles.admin)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.create(createAccountDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @Post('login')
  @HttpCode(200)
  login(@Body() loginAccountDto: LoginAccountDto) {
    return this.authService.login(loginAccountDto);
  }

  @ApiOperation({ summary: 'Get users with lower role than logged in user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users with lower role',
  })
  @ApiBearerAuth()
  @Get('lower-role-users')
  @Auth(
    ValidRoles.businessManager,
    ValidRoles.areaManager,
    ValidRoles.areaLeader,
  )
  getUsersByRole(@GetAccount() account: Account) {
    return this.authService.getUsersWithLowerRole(account.role);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Returns all roles',
  })
  @Get('roles')
  getRoles() {
    return this.authService.getAllRoles();
  }
}
