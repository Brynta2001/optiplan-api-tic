import { faker } from '@faker-js/faker';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

export const mockCreateProjectDto: CreateProjectDto = {
  title: faker.lorem.sentence(),
  code: faker.hacker.abbreviation(),
  description: faker.lorem.paragraph(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
};
