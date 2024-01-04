import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import * as bcrypt from "bcrypt";

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({id: user.id})
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password, role } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: {
        email: true, 
        password: true, 
        fullName: true, 
        roles: true, 
        department: true,
        id: true
      },
    });

    if (!user){
      throw new UnauthorizedException('Credentials are not valid (email)');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return {
      ...user,
      token: this.getJwtToken({id: user.id})
    };
  }

  async getUsersWithLowerRoles(roles: string[]) {
    const acceptRoles = this.returnRoles(roles);
    return await this.userRepository.find({
      where: { roles: In(acceptRoles) },
      select: { email: true, fullName: true, id: true },
    });
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }

  private returnRoles(roles: string[]) {
    if (roles.includes('admin')) {
      return ['{business_manager}', '{area_manager}', '{area_leader}', '{technician}'];
    }
    if (roles.includes('business_manager')) {
      return ['{area_manager}', '{area_leader}', '{technician}'];
    }
    if (roles.includes('area_manager')) {
      return ['{area_leader}', '{technician}'];
    }
    if (roles.includes('area_leader')) {
      return ['{technician}'];
    }
  }
}
