import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from '../stages/entities/stage.entity';
import { StagesService } from '../stages/stages.service';
import { Board } from '../boards/entities/board.entity';
import { BoardsService } from '../boards/boards.service';
import { mockBoard, mockBoardRepository, mockCreateStageDto, mockStageRepository, mockStages, mockUpdateStageDto } from '../../test/utils';

describe('StagesService', () => {
  let service: StagesService;

  // let stageRepository: Repository<Stage>;
  // let boardRepository: Repository<Board>;

  let stageRepositoryToken: string | Function = getRepositoryToken(Stage);
  let boardRepositoryToken: string | Function = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StagesService,
        BoardsService,
        {
          provide: stageRepositoryToken,
          useValue: mockStageRepository,
        },
        {
          provide: boardRepositoryToken,
          useValue: mockBoardRepository,
        },
        
      ],
    }).compile();

    service = module.get<StagesService>(StagesService);
    // stageRepository = module.get<Repository<Stage>>(stageRepositoryToken);
    // boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not create a new stage if board does not exist', async () => {
    jest.spyOn(mockBoardRepository, 'findOneBy').mockReturnValue(null);

    try {
      await service.create(mockCreateStageDto);
    } catch (error) {
      expect(error.message).toEqual(
        'Board with id caf7113a-a6c3-4b5d-92f0-260ff5122caf in which you are trying to add columns does not exist',
      );
    }
  });

  it('should not update a stage if board does not exist', async () => {
    jest.spyOn(mockBoardRepository, 'findOneBy').mockReturnValue(null);

    try {
      await service.update(mockStages[0].id, mockUpdateStageDto);
    } catch (error) {
      expect(error.message).toEqual(
        'Board with id caf7113a-a6c3-4b5d-92f0-260ff5122caf in which you are trying to update a column does not exist',
      );
    }
  });

  it('should not update a stage if it does not exist', async () => {
    jest.spyOn(mockBoardRepository, 'findOneBy').mockReturnValue(mockBoard);
    jest.spyOn(mockStageRepository, 'preload').mockReturnValue(null);

    try {
      await service.update(mockStages[0].id, mockCreateStageDto);
    } catch (error) {
      expect(error.message).toEqual('Stage (column) with id 885fb911-7eca-4106-b2f6-d3640bdac6bb not found');
    }
  });

  it('should not delete a stage if it does not exist', async () => {
    jest.spyOn(mockStageRepository, 'findOneBy').mockReturnValue(null);

    try {
      await service.remove(mockStages[0].id);
    } catch (error) {
      expect(error.message).toEqual('Stage (column) with id 885fb911-7eca-4106-b2f6-d3640bdac6bb not found');
    }
  });
});
