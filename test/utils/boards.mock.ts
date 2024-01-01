import { CreateBoardDto } from "src/boards/dto/create-board.dto";
import { Board } from "src/boards/entities/board.entity";
import { mockStages } from "./stages.mock";
import { UpdateBoardDto } from "src/boards/dto/update-board.dto";

export const mockBoardId = 'caf7113a-a6c3-4b5d-92f0-260ff5122caf';
const mockName = 'Proyecto de desarrollo de software';
const mockDescription = 'Este tablero Kanban se utiliza para el desarrollo de software. El equipo utiliza este tablero para realizar un seguimiento del progreso del proyecto y asegurarse de que todas las tareas se completen a tiempo.';

export const mockCreateBoardDto = {
  name: mockName,
  description: mockDescription,
  columns: 3,
} as CreateBoardDto;

export const mockUpdateBoardDto = {
  name: 'Proyecto de software',
} as UpdateBoardDto;

export const mockBoard = {
  name: mockName,
  description: mockDescription,
  stages: mockStages,
  id: mockBoardId,
} as Board;

export const mockUpdatedBoard = {
  name: 'Proyecto de software',
  description: mockDescription,
  stages: mockStages,
  id: mockBoardId,
} as Board;

export const mockBoards = [
  mockBoard,
];

export const mockBoardRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
};

