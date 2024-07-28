import { faker } from '@faker-js/faker';

export const fixtureProjects = [
  {
    id: faker.string.uuid(),
    title: 'Transformación Digital de la Empresa',
    description:
      'Implementación de nuevas tecnologías para optimizar procesos y mejorar la eficiencia operativa.',
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    code: faker.hacker.abbreviation(),
    priorityOrder: 1,
  },
];
