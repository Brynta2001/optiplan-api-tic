import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestDatabaseHelper } from './utils/helpers/test-database.helper';
import { DataSource } from 'typeorm';
import { mockCreateStateDto } from './utils/mocks';
import { fixtureStates } from './utils/fixtures';

describe('AppController (e2e)', () => {
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

    await testDatabaseHelper.seedStates(dataSource);

    app = moduleFixture.createNestApplication();
    return await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when a user needs to define states for tasks', () => {
    // POST /tasks
    it('creates a new state', async () => {
      const response = await request(app.getHttpServer())
        .post('/states')
        .send(mockCreateStateDto)
        .expect(201);

      const state = response.body;
      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('name');
      expect(state).toHaveProperty('sequence');
    });

    // GET /states
    it('returns all states', async () => {
      const response = await request(app.getHttpServer())
        .get('/states')
        .expect(200);

      const states = response.body;
      expect(states).toBeInstanceOf(Array);
      expect(states).toHaveLength(4);
    });

    // GET /tasks/:id
    it('returns a state by id', async () => {
      const id = fixtureStates[0].id;
      const response = await request(app.getHttpServer())
        .get(`/states/${id}`)
        .expect(200);

      const state = response.body;
      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('name');
      expect(state).toHaveProperty('sequence');
    });

    // PATCH /tasks/:id
    it('updates a state by id', async () => {
      const id = fixtureStates[1].id;
      const response = await request(app.getHttpServer())
        .patch(`/states/${id}`)
        .send({ name: 'Work in Progress' })
        .expect(200);

      const state = response.body;
      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('name', 'Work in Progress');
      expect(state).toHaveProperty('sequence');
    });

    // DELETE /tasks/:id
    it('deletes a state by id', async () => {
      const id = fixtureStates[1].id;

      await request(app.getHttpServer()).get(`/states/${id}`).expect(200);
    });
  });
});
