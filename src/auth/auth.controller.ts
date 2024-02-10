import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto';
import { Auth, GetAccount } from './decorators';
import { ValidRoles } from './interfaces/roles.interface';
import { Account } from './entities/account.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  //@Auth(ValidRoles.admin)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.create(createAccountDto);
  }

  @Post('login')
  login(@Body() loginAccountDto: LoginAccountDto) {
    return this.authService.login(loginAccountDto);
  }

  @Get('lower-role-users')
  @Auth(ValidRoles.businessManager, ValidRoles.areaManager, ValidRoles.areaLeader)
  getUsersByRole(@GetAccount() account: Account) {
    return this.authService.getUsersWithLowerRole(account.role);
  }

  @Get('roles')
  getRoles() {
    return this.authService.getAllRoles();
  }
}
