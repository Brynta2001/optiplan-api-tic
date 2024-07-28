import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';
import { TestDatabaseHelper } from './utils/helpers/test-database.helper';
import { mockCreateProjectDto, mockLoginAccountDto } from './utils/mocks';
import { fixtureProjects } from './utils/fixtures';

describe('ProjectsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testDatabaseHelper = TestDatabaseHelper.getInstance();
    const dataSource = await testDatabaseHelper.createTestDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    await testDatabaseHelper.seedAuth(moduleFixture.get(DataSource));
    await testDatabaseHelper.seedProjects(moduleFixture.get(DataSource));

    app = moduleFixture.createNestApplication();
    return await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when a user with role of business manager is logged in', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginAccountDto.BUSINESS_MANAGER)
        .expect(200);

      token = response.body.token;
    });

    // POST /projects
    it('creates a new project', async () => {
      const response = await request(app.getHttpServer())
        .post('/projects')
        .send(mockCreateProjectDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      const project = response.body;
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('startDate');
      expect(project).toHaveProperty('endDate');
      expect(project).toHaveProperty('code');
      expect(project).toHaveProperty('priorityOrder');
      expect(project).toHaveProperty('createdBy');
    });

    // GET /projects
    it('returns a list of projects', async () => {
      const response = await request(app.getHttpServer())
        .get('/projects')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const projects = response.body;
      expect(projects).toBeInstanceOf(Array);
    });

    // GET /projects/:id
    it('returns a project by id', async () => {
      const id = fixtureProjects[0].id;
      const response = await request(app.getHttpServer())
        .get(`/projects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const project = response.body;
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('startDate');
      expect(project).toHaveProperty('endDate');
      expect(project).toHaveProperty('code');
      expect(project).toHaveProperty('priorityOrder');
      expect(project).toHaveProperty('createdBy');
    });

    // PATCH /projects/:id
    it('updates a project by id', async () => {
      const id = fixtureProjects[0].id;
      const response = await request(app.getHttpServer())
        .patch(`/projects/${id}`)
        .send({ title: 'Nuevo entorno digital' })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const project = response.body;
      expect(project.title).toBe('Nuevo entorno digital');
    });

    // DELETE /projects/:id
    it('deletes a project by id', async () => {
      const id = fixtureProjects[0].id;
      await request(app.getHttpServer())
        .delete(`/projects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('when a user with a role other than business manager is logged in', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginAccountDto.AREA_MANAGER)
        .expect(200);

      token = response.body.token;
    });

    // POST /projects
    it('denies the creation of a new project', async () => {
      const response = await request(app.getHttpServer())
        .post('/projects')
        .send(mockCreateProjectDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      const error = response.body;
      expect(error).toHaveProperty('statusCode');
      expect(error).toHaveProperty('message');
    });
  });
});
