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
});
