import { CreateStageDto } from "src/stages/dto/create-stage.dto";
import { Stage } from "src/stages/entities/stage.entity";

export const mockStages = [
    {
      name: 'Column 1',
      id: '885fb911-7eca-4106-b2f6-d3640bdac6bb'
    } as Stage,
    {
      name: 'Column 2',
      id: 'caadd6f0-d455-443f-a20f-165685c8731a'
    } as Stage,
    {
      name: 'Column 3',
      id: '00412473-9e1e-4435-9df2-7b56a5433c58'
    } as Stage,
  ];

export const mockCreateStageDto = {
    name: 'Column 1',
    boardId: 'caf7113a-a6c3-4b5d-92f0-260ff5122caf',
}  as CreateStageDto;

export const mockUpdateStageDto = {
  name: 'In progress',
  boardId: 'caf7113a-a6c3-4b5d-92f0-260ff5122caf',
}  as CreateStageDto;

export const mockStageRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
};