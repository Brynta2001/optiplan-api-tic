import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards.module';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  it('should create a new board', async () => {
    const board = await service.create({
      name: 'Test board',
      description: 'Test description',
      columns: 1,
    });
    expect(board).not.toBeNull();
  });

  it('should update a board', async () => {
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
  });
});
