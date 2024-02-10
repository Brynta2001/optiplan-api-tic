import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto';
import { Auth, GetAccount } from './decorators';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/roles.interface';
import { Account } from './entities/account.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  //@Auth(ValidRoles.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
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
