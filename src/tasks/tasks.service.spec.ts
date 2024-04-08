import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stage } from '../stages/entities/stage.entity';
import { StagesService } from '../stages/stages.service';
import { Board } from '../boards/entities/board.entity';
import { BoardsService } from '../boards/boards.service';
import { User } from '../auth/entities/user.entity';
import {
  mockCreateTaskDto,
  mockTasks,
  mockUpdateTaskDto,
  mockStages,
  mockUser,
} from '../../test/utils';

describe('TasksService', () => {
  let service: TasksService;

  let taskRepository: Repository<Task>;
  let stageRepository: Repository<Stage>;
  let boardRepository: Repository<Board>;
  let userRepository: Repository<User>;

  let taskRepositoryToken: string | Function = getRepositoryToken(Task);
  let stageRepositoryToken: string | Function = getRepositoryToken(Stage);
  let boardRepositoryToken: string | Function = getRepositoryToken(Board);
  let userRepositoryToken: string | Function = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        StagesService,
        BoardsService,
        {
          provide: taskRepositoryToken,
          useClass: Repository,
        },
        {
          provide: stageRepositoryToken,
          useClass: Repository,
        },
        {
          provide: boardRepositoryToken,
          useClass: Repository,
        },
        {
          provide: userRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(taskRepositoryToken);
    stageRepository = module.get<Repository<Stage>>(stageRepositoryToken);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
    userRepository = module.get<Repository<User>>(userRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not create a new task if stage does not exist', async () => {
    jest.spyOn(stageRepository, 'findOneBy').mockReturnValue(null);

    try {
      await service.create(mockCreateTaskDto);
    } catch (error) {
      expect(error.message).toEqual(
        'Stage (column) with id 885fb911-7eca-4106-b2f6-d3640bdac6bb not found',
      );
    }
  });

  it('should not update a task if stage does not exist', async () => {
    jest.spyOn(stageRepository, 'findOneBy').mockReturnValue(null);

    try {
      await service.update(
        '885fb911-7eca-4106-b2f6-d3640bdac6bb',
        mockUpdateTaskDto,
      );
    } catch (error) {
      expect(error.message).toEqual(
        'Stage (column) with id 885fb911-7eca-4106-b2f6-d3640bdac6bb not found',
      );
    }
  });

  it('should not update a task if it does not exist', async () => {
    jest
      .spyOn(stageRepository, 'findOneBy')
      .mockReturnValue(Promise.resolve(mockStages[0]));
    jest
      .spyOn(userRepository, 'findOneBy')
      .mockReturnValue(Promise.resolve(mockUser));
    jest.spyOn(taskRepository, 'preload').mockReturnValue(null);

    try {
      await service.update(mockTasks[0].id, mockUpdateTaskDto);
    } catch (error) {
      expect(error.message).toEqual(
        'Task with id e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c not found',
      );
    }
  });

  it('should not delete a task if it does not exist', async () => {
    jest.spyOn(taskRepository, 'findOneBy').mockReturnValue(null);

    try {
      await service.remove(mockTasks[0].id);
    } catch (error) {
      expect(error.message).toEqual(
        'Task with id e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c not found',
      );
    }
  });
});
