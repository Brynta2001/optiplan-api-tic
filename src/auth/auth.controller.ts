import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/roles.interface';


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

  /*@Get('users')
  @Auth(ValidRoles.admin)
  getUsers(
    @GetUser() user: User,
  ) {
    return this.authService.getUsersWithLowerRoles(user.roles);
  }*/

  @Get('users')
  @Auth(ValidRoles.businessManager, ValidRoles.areaManager, ValidRoles.areaLeader)
  getUsersByRole(@GetUser() user: User) {
    return this.authService.getUsersWithLowerRole(user.roles[0]);
  }

}
