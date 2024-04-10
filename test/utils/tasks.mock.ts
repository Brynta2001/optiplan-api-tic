import { faker } from '@faker-js/faker';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/entities/task.entity';

export const mockTaskRepository = {};

export const mockTasks: Task[] = [
  {
    id: faker.string.uuid(),
    title: 'Recopilar requisitos',
    description: 'Agendar reunión con el cliente para recopilar requisitos',
    project: null,
    state: null,
    assignedTo: null,
    createdBy: null,
  },
];

export const mockCreateTaskDto: CreateTaskDto = {
  title: 'Recopilar requisitos',
  description: 'Agendar reunión con el cliente para recopilar requisitos',
  stageId: faker.string.uuid(),
  projectId: faker.string.uuid(),
} as CreateTaskDto;

export const mockUpdateTaskDto: UpdateTaskDto = {
  title: 'Recopilar requisitos de usuario',
  description:
    'Agendar la reunión con las partes interesadas para recopilar requisitos de usuario',
  stageId: faker.string.uuid(),
} as UpdateTaskDto;
