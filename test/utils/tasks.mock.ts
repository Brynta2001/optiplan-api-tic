import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/entities/task.entity';

export const mockTasks = [
  {
    id: 'e7c6b0b2-3f2a-4f5e-9a5a-3f4c1b7e7e7c',
    title: 'Recopilar requisitos',
    description: 'Agendar reunión con el cliente para recopilar requisitos',
  } as Task,
  {
    id: 'a2d8d1c0-4b0b-4e6b-8e7b-5b1a1b7b1b1a',
    title: 'Refinar las historias de usuario',
    description: 'Refinar las historias de usuario con el equipo de desarrollo',
  } as Task,
];

export const mockCreateTaskDto = {
  title: 'Recopilar requisitos',
  description: 'Agendar reunión con el cliente para recopilar requisitos',
  stageId: '885fb911-7eca-4106-b2f6-d3640bdac6bb',
  projectId: 'a2d8d1c0-4b0b-4e6b-8e7b-5b1a1b7b1b1a',
} as CreateTaskDto;

export const mockUpdateTaskDto = {
  title: 'Recopilar requisitos de usuario',
  description:
    'Agendar la reunión con las partes interesadas para recopilar requisitos de usuario',
  stageId: '885fb911-7eca-4106-b2f6-d3640bdac6bb',
} as UpdateTaskDto;

export const mockTaskRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
};
