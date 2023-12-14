import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { BoardsModule } from './boards.module';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { StagesService } from '../stages/stages.service';
import { Stage } from '../stages/entities/stage.entity';


describe('BoardsService', () => {
  let service: BoardsService;
  let boardRepository: Repository<Board>;
  let stageRepository: Repository<Stage>;

  let boardRepositoryToken: string | Function = getRepositoryToken(Board);
  let stageRepositoryToken: string | Function = getRepositoryToken(Stage)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        StagesService,
        {
          provide: boardRepositoryToken,
          useClass: Repository,
        },
        {
          provide: stageRepositoryToken,
          useClass: Repository,
        },
      ]
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
    stageRepository = module.get<Repository<Stage>>(stageRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new board', async () => {
    const board = await service.create({
      name: 'Test board',
      description: 'Test description',
      columns: 3,
    });
    console.log(board);
    expect(board).not.toBeNull();
  });

  /*it('should update a board', async () => {
    const newBoard = await service.create({
      name: 'Test board',
      description: 'Test description',
      columns: 1,
    });

    const board = await service.update(newBoard.id, {
      name: 'New Title',
      description: 'New test description',
    });
    expect(board).not.toBeNull();
    expect(board.name).toEqual('New Title');
  });*/
});
