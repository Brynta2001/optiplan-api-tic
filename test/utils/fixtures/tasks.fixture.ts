import { faker } from '@faker-js/faker';
import { fixtureProjects } from './projects.fixture';
import { Project } from 'src/projects/entities/project.entity';

export const fixtureTasks = [
  {
    id: faker.string.uuid(),
    title: 'Recopilar requisitos',
    description: 'Agendar reunión con el cliente para recopilar requisitos',
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    project: fixtureProjects[0] as Project,
  },
  {
    id: faker.string.uuid(),
    title: 'Evaluar sistemas existentes',
    description:
      'Realizar un análisis exhaustivo de los sistemas actuales y su capacidad para soportar la digitalización.',
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    project: fixtureProjects[0] as Project,
  },
];
