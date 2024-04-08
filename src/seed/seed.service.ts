import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { In, Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { Role } from 'src/auth/entities/role.entity';
import { Account } from 'src/auth/entities/account.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createUsers() {
    this.deleteAccounts();
    this.deleteUsers();
    const seedAccounts = initialData.accounts;
    const accounts: Account[] = [];
    seedAccounts.forEach(async (account) => {
      const { roles, ...userData } = account;
      const user = this.userRepository.create(userData);
      const userRoles = await this.getRolesByName(roles);
      userRoles.forEach((role) => {
        const account = this.accountRepository.create({
          role,
          user: user,
        });
        accounts.push(account);
      });
    });

    await this.userRepository.save(accounts);
    return accounts;
  }

  async deleteUsers() {
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  async deleteAccounts() {
    const queryBuilder = this.accountRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  async createRoles() {
    const seedRoles = initialData.roles;
    const roles = seedRoles.map((role) => {
      return this.roleRepository.create(role);
    });

    return await this.roleRepository.save(roles);
  }

  private async getRolesByName(roles: string[]) {
    return await this.roleRepository.find({ where: { name: In(roles) } });
  }
}
