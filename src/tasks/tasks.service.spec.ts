import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { ProjectsService } from '../projects/projects.service';
import { StatesService } from '../states/states.service';
import { Task } from './entities/task.entity';
import { Account } from '../auth/entities/account.entity';
import { Project } from '../projects/entities/project.entity';
import { State } from '../states/entities/state.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  mockAccountRepository,
  mockAccounts,
  mockProjectRepository,
  mockTaskRepository,
  mockTasks,
  mockStateRepository,
  mockAssignedTask,
} from '../../test/utils';

describe('TasksService', () => {
  let tasksService: TasksService;

  const taskRepositoryToken = getRepositoryToken(Task);
  const accountRepositoryToken = getRepositoryToken(Account);
  const projectRepositoryToken = getRepositoryToken(Project);
  const stateRepositoryToken = getRepositoryToken(State);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        ProjectsService,
        StatesService,
        {
          provide: taskRepositoryToken,
          useValue: mockTaskRepository,
        },
        {
          provide: accountRepositoryToken,
          useValue: mockAccountRepository,
        },
        {
          provide: projectRepositoryToken,
          useValue: mockProjectRepository,
        },
        {
          provide: stateRepositoryToken,
          useValue: mockStateRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('TEST-4 should not assign a task to a user with a greater role', async () => {
    const updateTaskDto: UpdateTaskDto = {
      assignedToId: mockAccounts[0].id,
    };
    jest
      .spyOn(mockAccountRepository, 'findOneBy')
      .mockReturnValue(mockAccounts[0]);

    try {
      await tasksService.update(
        mockTasks[0].id,
        updateTaskDto,
        mockAccounts[1],
      );
    } catch (error) {
      expect(error.message).toBe(
        'You cannot assign a task to a user with a greater role',
      );
      expect(error.status).toBe(400);
    }
  });

  it('TEST-6 should assign a task to a user after creating a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      assignedToId: mockAccounts[1].id,
    };

    jest
      .spyOn(mockAccountRepository, 'findOneBy')
      .mockReturnValue(mockAccounts[1]);
    jest.spyOn(mockTaskRepository, 'preload').mockReturnValue(mockAssignedTask);
    jest.spyOn(mockTaskRepository, 'save').mockReturnValue(mockAssignedTask);

    const assignedTask = await tasksService.update(
      mockTasks[0].id,
      updateTaskDto,
      mockAccounts[0],
    );

    expect(assignedTask.assignedTo).toEqual(mockAccounts[1]);
  });
});
