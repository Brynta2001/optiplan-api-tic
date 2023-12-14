import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stage } from '../stages/entities/stage.entity';
import { StagesService } from '../stages/stages.service';
import { Board } from '../boards/entities/board.entity';
import { BoardsService } from '../boards/boards.service';

describe('TasksService', () => {
  let service: TasksService;

  let taskRepository: Repository<Task>;
  let stageRepository: Repository<Stage>;
  let boardRepository: Repository<Board>;

  let taskRepositoryToken: string | Function = getRepositoryToken(Task);
  let stageRepositoryToken: string | Function = getRepositoryToken(Stage);
  let boardRepositoryToken: string | Function = getRepositoryToken(Board);

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
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(taskRepositoryToken);
    stageRepository = module.get<Repository<Stage>>(stageRepositoryToken);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
