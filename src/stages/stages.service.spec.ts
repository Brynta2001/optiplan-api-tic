import { Test, TestingModule } from '@nestjs/testing';
import { StagesService } from './stages.service';
import { Repository } from 'typeorm';
import { Stage } from './entities/stage.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { BoardsService } from '../boards/boards.service';

describe('StagesService', () => {
  let service: StagesService;

  let stageRepository: Repository<Stage>;
  let boardRepository: Repository<Board>;

  let stageRepositoryToken: string | Function = getRepositoryToken(Stage);
  let boardRepositoryToken: string | Function = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StagesService,
        BoardsService,
        {
          provide: boardRepositoryToken,
          useClass: Repository,
        },
        {
          provide: stageRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StagesService>(StagesService);
    stageRepository = module.get<Repository<Stage>>(stageRepositoryToken);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
