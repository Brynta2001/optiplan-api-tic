import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import * as bcrypt from "bcrypt";

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LevelRoles } from './interfaces/roles.interface';
import { Role } from './entities/role.entity';
import { Account } from './entities/account.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, roles, ...userData } = createUserDto;
      
      const userRoles = await this.getRolesByName(roles);
      
      // User creation
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      const userCreated = await this.userRepository.save(user);

      // Accounts creation
      const accounts: Account[] = [];
      userRoles.forEach(role => {
        const account = this.accountRepository.create({
          role,
          user: userCreated,
        });
        accounts.push(account);
      });

      await this.accountRepository.save(accounts);
      delete userCreated.password
      return {
        ...userCreated,
        roles,
      }
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async getAllRoles(){
    return await this.roleRepository.find();
  }

  private async getRolesByName(roles: string[]){
    return await this.roleRepository.find({where: {name: In(roles)}});
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password, role } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email}
    });

    const account = await this.accountRepository.findOne({
      where: {
        user: {id: user.id},
        role: {name: role},
      },
      select: {
        user: {
          email: true, 
          password: true,
          fullName: true,
          department: true,
          id: true,
        },
        role: {
          name: true,
        },
        id: true,
      },
      relations: ['user', 'role'],
    });

    // Email (user) or role are not valid
    if (!user || !account){
      throw new UnauthorizedException('Credentials are not valid (account)');
    }
    if (!bcrypt.compareSync(password, account.user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return {
      email: account.user.email,
      fullName: account.user.fullName,
      department: account.user.department,
      role: account.role.name,
      token: this.getJwtToken({id: account.id}),
    };
  }
 
  // Return users with lower role than logged user
  // async getUsersWithLowerRole(role: string) {
  //   const roleLevel: number = LevelRoles[role];
  //   const lowerRole = Object.keys(LevelRoles).find(key => LevelRoles[key] === (roleLevel + 1));

  //   const users = await this.userRepository.find({
  //     where: { roles: In([`{${lowerRole}}`]) },
  //     select: { email: true, fullName: true, id: true },
  //   });
  //   return users;
  // }

  /*async getUsersWithLowerRoles(roles: string[]) {
    const acceptRoles = this.returnRoles(roles);
    return await this.userRepository.find({
      where: { roles: In(acceptRoles) },
      select: { email: true, fullName: true, id: true },
    });
  }*/

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
}
