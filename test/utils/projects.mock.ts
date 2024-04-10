import { faker } from '@faker-js/faker';
import { Project } from 'src/projects/entities/project.entity';
import { mockAccounts } from './accounts.mock';

export const mockProjectRepository = {};

export const mockProjects: Project[] = [
  {
    id: faker.string.uuid(),
    title: 'Project 1',
    description: 'Project 1 description',
    code: faker.hacker.abbreviation(),
    createdBy: mockAccounts[0],
    states: [],
    tasks: [],
  },
];
