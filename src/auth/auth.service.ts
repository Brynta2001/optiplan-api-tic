import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  login(loginUserDto: LoginUserDto) {
    throw new Error('Method not implemented.');
  }
}
