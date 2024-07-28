import { faker } from '@faker-js/faker';
import { CreateTaskDto } from '../../../../src/tasks/dto/create-task.dto';
import { fixtureProjects } from '../../fixtures';

export const mockCreateTaskDto: CreateTaskDto = {
  title: 'Implementar autenticación',
  description: 'Implementar autenticación de usuarios utilizando JWT.',
  startDate: faker.date.past().toString(),
  endDate: faker.date.future().toString(),
  projectId: fixtureProjects[0].id,
};
