import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { Account } from '../auth/entities/account.entity';
import { State } from '../states/entities/state.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
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
      return this.rolesRepository.create(role);
    });

    return await this.rolesRepository.save(roles);
  }

  async deleteStates() {
    const queryBuilder = this.rolesRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  async createStates() {
    const seedStates = initialData.states;
    const states = seedStates.map((state) => {
      return this.statesRepository.create(state);
    });
    return await this.statesRepository.save(states);
  }

  private async getRolesByName(roles: string[]) {
    return await this.rolesRepository.find({ where: { name: In(roles) } });
  }
}
