import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { State } from '../../../src/states/entities/state.entity';
import { Project } from '../../../src/projects/entities/project.entity';
import { Task } from '../../../src/tasks/entities/task.entity';
import { Role } from '../../../src/auth/entities/role.entity';
import { User } from '../../../src/auth/entities/user.entity';
import { Account } from '../../../src/auth/entities/account.entity';
import {
  rolesFixtures,
  fixtureUsers,
  fixtureAccounts,
  fixtureProjects,
  fixtureStates,
} from '../fixtures';
import { fixtureTasks } from '../fixtures/tasks.fixture';

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

  async seedProjects(dataSource: DataSource) {
    const projectRepository = dataSource.getRepository(Project);
    const accountRepository = dataSource.getRepository(Account);
    const accounts = await accountRepository.find();
    const projects = projectRepository.create(
      fixtureProjects.map((project) => {
        return {
          ...project,
          createdBy: accounts[0],
        };
      }),
    );
    await projectRepository.save(projects);
  }

  async seedStates(dataSource: DataSource) {
    const stateRepository = dataSource.getRepository(State);
    const states = stateRepository.create(fixtureStates);
    await stateRepository.save(states);
  }

  async seedTasks(dataSource: DataSource) {
    const taskRepository = dataSource.getRepository(Task);
    const projectRepository = dataSource.getRepository(Project);
    const accountRepository = dataSource.getRepository(Account);
    const accounts = await accountRepository.find();
    const projects = await projectRepository.find();
    const tasks = taskRepository.create(
      fixtureTasks.map((task) => {
        return {
          ...task,
          project: projects[0],
          createdBy: accounts[0],
        };
      }),
    );
    await taskRepository.save(tasks);
  }
}
