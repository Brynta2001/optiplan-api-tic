import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { StagesService } from '../stages/stages.service';
import { Stage } from '../stages/entities/stage.entity';
import { mockBoard, mockBoardId, mockCreateBoardDto, mockUpdateBoardDto, mockUpdatedBoard, mockStages, mockBoardRepository, mockStageRepository } from '../../test/utils';


describe('BoardsService', () => {
  let boardsService: BoardsService;
  // let boardRepository: Repository<Board>;
  // let stageRepository: Repository<Stage>;

  let boardRepositoryToken: string | Function = getRepositoryToken(Board);
  let stageRepositoryToken: string | Function = getRepositoryToken(Stage);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        StagesService,
        {
          provide: boardRepositoryToken,
          useValue: mockBoardRepository,
        },
        {
          provide: stageRepositoryToken,
          useValue: mockStageRepository,
        },
      ]
    }).compile();

    boardsService = module.get<BoardsService>(BoardsService);
    // boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
    // stageRepository = module.get<Repository<Stage>>(stageRepositoryToken);
  });

  it('should be defined', () => {
    expect(boardsService).toBeDefined();
  });

  it('should create a new board', async () => {

    jest.spyOn(mockBoardRepository, 'save').mockReturnValue(mockBoard);
    jest.spyOn(mockBoardRepository, 'create').mockReturnValue(mockBoard);
    jest.spyOn(mockStageRepository, 'create')
      .mockReturnValueOnce(mockStages[0])
      .mockReturnValueOnce(mockStages[1])
      .mockReturnValueOnce(mockStages[2]);

    const boardExists = await boardsService.create(mockCreateBoardDto);

    expect(mockBoardRepository.save).toHaveBeenCalled();
    expect(mockBoardRepository.save).toHaveBeenCalledWith(mockBoard);
    expect(mockBoardRepository.create).toHaveBeenCalled();
    const {columns, ...boardToCreate} = mockCreateBoardDto;
    expect(mockBoardRepository.create).toHaveBeenCalledWith({...boardToCreate, stages: mockStages});
    expect(mockStageRepository.create).toHaveBeenCalledTimes(mockCreateBoardDto.columns);
    
    expect(boardExists).toEqual(mockBoard);
  });

  it('should update a board', async () => {

    jest.spyOn(mockBoardRepository, 'preload').mockReturnValue(mockUpdatedBoard);
    jest.spyOn(mockBoardRepository, 'save').mockReturnValue(mockUpdatedBoard);

    const boardUpdated = await boardsService.update(mockBoardId, mockUpdateBoardDto);

    expect(mockBoardRepository.preload).toHaveBeenCalled();
    expect(mockBoardRepository.preload).toHaveBeenCalledWith({id: mockBoardId, ...mockUpdateBoardDto});
    
    expect(mockBoardRepository.save).toHaveBeenCalled();
    expect(mockBoardRepository.save).toHaveBeenCalledWith(mockUpdatedBoard);

    expect(boardUpdated).toEqual(mockUpdatedBoard);
  });

  it('should not create a board if the number of columns is greater than 10', async () => {
    const createBoardDto = {
      name: mockCreateBoardDto.name,
      description: mockCreateBoardDto.description,
      columns: 17,
    };

    try {
      await boardsService.create(createBoardDto);
    } catch (error) {
      expect(error.message).toEqual('Columns must be less than 10');
    }
    // expect(boardsService.create(createBoardDto)).rejects.toThrow('Columns must be less than 10');
  });

  it('should not update a board if it does not exist', async () => {

    jest.spyOn(mockBoardRepository, 'preload').mockReturnValue(null);

    const boardUpdated = boardsService.update(mockBoardId, mockUpdateBoardDto)

    expect(boardUpdated).rejects.toThrow('Board with id caf7113a-a6c3-4b5d-92f0-260ff5122caf not found');
  });
});
