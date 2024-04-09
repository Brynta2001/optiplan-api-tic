import { faker } from '@faker-js/faker';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/entities/task.entity';

export const mockTaskRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
};

export const mockTasks = [
  {
    id: faker.string.uuid(),
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
  stageId: faker.string.uuid(),
  projectId: faker.string.uuid(),
} as CreateTaskDto;

export const mockUpdateTaskDto = {
  title: 'Recopilar requisitos de usuario',
  description:
    'Agendar la reunión con las partes interesadas para recopilar requisitos de usuario',
  stageId: faker.string.uuid(),
} as UpdateTaskDto;
