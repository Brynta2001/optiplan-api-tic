import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ProjectsModule } from '../src/projects/projects.module';
import { ProjectsService } from '../src/projects/projects.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../src/projects/entities/project.entity';

describe('Projects (e2e)', () => {
  let app: INestApplication;
  const projectRepositoryToken = getRepositoryToken(Project);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        ProjectsModule,
        ConfigModule.forRoot(),
      ],
      providers: [
        ProjectsService,
        {
          provide: projectRepositoryToken,
          useClass: Repository,
        },
        // {
        //   provide: DataSource,
        //   useFactory: async () => await testDatasetSeed(),
        // },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/projects')
      .expect(200)
      .expect('Hello World!');
  });
});
