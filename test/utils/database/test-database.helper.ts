import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { State } from '../../../src/states/entities/state.entity';
import { Project } from '../../../src/projects/entities/project.entity';
import { Task } from '../../../src/tasks/entities/task.entity';
import { Role } from '../../../src/auth/entities/role.entity';
import { User } from '../../../src/auth/entities/user.entity';
import { Account } from '../../../src/auth/entities/account.entity';
import { rolesFixtures } from '../fixtures/roles.fixture';
import { fixtureAccounts } from '../fixtures/accounts/accounts.fixture';
import { fixtureUsers } from '../fixtures/users.fixture';

export class TestDatabaseHelper {
  private static _instance: TestDatabaseHelper;

  private constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new TestDatabaseHelper();
    }

    return this._instance;
  }

  async createTestDatabase() {
    const dataSource = new DataSource({
      name: 'test-database',
      type: 'better-sqlite3',
      database: ':memory:',
      // entities: [`${__dirname} + '/../**/entities/*.entity{.ts,.js}'`],
      entities: [Role, User, Account, Project, Task, State],
      synchronize: true,
      dropSchema: true,
    });

    await dataSource.initialize();
    await dataSource.synchronize();
    return dataSource;
  }

  // async seedTestDatabase(dataSource: DataSource) {}

  async seedAuth(dataSource: DataSource) {
    const roleRepository = dataSource.getRepository(Role);
    const roles = roleRepository.create(rolesFixtures);
    await roleRepository.save(roles);

    const userRepository = dataSource.getRepository(User);
    const users = userRepository.create(
      fixtureUsers.map((user) => {
        return {
          ...user,
          password: bcrypt.hashSync(user.password, 10),
        };
      }),
    );
    await userRepository.save(users);

    const accountRepository = dataSource.getRepository(Account);
    const newAccounts = fixtureAccounts.map((account) => {
      return {
        user: users.find((user) => user.email === account.user.email),
        role: roles.find((role) => role.name === account.role),
      };
    });
    const accounts = accountRepository.create(newAccounts);

    await accountRepository.save(accounts);
  }
}
