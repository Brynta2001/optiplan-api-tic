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

    const updatedTask = await tasksService.update(
      mockTasks[0].id,
      updateTaskDto,
    );
    expect(updatedTask.assignedTo).toEqual(mockAccounts[0]);
  });

  //   it('should not create a new task if stage does not exist', async () => {
  //     jest.spyOn(stageRepository, 'findOneBy').mockReturnValue(null);

  //     try {
  //       await taskService.create(mockCreateTaskDto);
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         'Stage (column) with id 885fb911-7eca-4106-b2f6-d3640bdac6bb not found',
  //       );
  //     }
  //   });

  //   it('should not update a task if stage does not exist', async () => {
  //     jest.spyOn(stageRepository, 'findOneBy').mockReturnValue(null);

  //     try {
  //       await taskService.update(
  //         '885fb911-7eca-4106-b2f6-d3640bdac6bb',
  //         mockUpdateTaskDto,
  //       );
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         'Stage (column) with id 885fb911-7eca-4106-b2f6-d3640bdac6bb not found',
  //       );
  //     }
  //   });

  //   it('should not update a task if it does not exist', async () => {
  //     jest
  //       .spyOn(stageRepository, 'findOneBy')
  //       .mockReturnValue(Promise.resolve(mockStages[0]));
  //     jest
  //       .spyOn(userRepository, 'findOneBy')
  //       .mockReturnValue(Promise.resolve(mockUser));
  //     jest.spyOn(taskRepository, 'preload').mockReturnValue(null);

  //     try {
  //       await taskService.update(mockTasks[0].id, mockUpdateTaskDto);
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         'Task with id e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c not found',
  //       );
  //     }
  //   });

  //   it('should not delete a task if it does not exist', async () => {
  //     jest.spyOn(taskRepository, 'findOneBy').mockReturnValue(null);

  //     try {
  //       await taskService.remove(mockTasks[0].id);
  //     } catch (error) {
  //       expect(error.message).toEqual(
  //         'Task with id e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c not found',
  //       );
  //     }
  //   });
});
