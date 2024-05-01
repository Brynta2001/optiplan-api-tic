import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProjectsModule } from '../src/projects/projects.module';
import {
  mockCreateProjectDto,
  mockProjectRepository,
  mockProjectsService,
} from './utils/mocks';
import { ProjectsService } from '../src/projects/projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../src/projects/entities/project.entity';

describe('ProjectsController (e2e)', () => {
  let app: INestApplication;

  const projectRepositoryToken = getRepositoryToken(Project);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectsModule],
      providers: [
        ProjectsService,
        {
          provide: projectRepositoryToken,
          useValue: mockProjectRepository,
        },
      ],
    })
      .overrideProvider(ProjectsService)
      .useValue(mockProjectsService)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/projects')
      .send(mockCreateProjectDto)
      .expect(200)
      .expect('Hello World!');
  });
});
