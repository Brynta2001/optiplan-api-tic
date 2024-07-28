import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { TestDatabaseHelper } from './utils/helpers/test-database.helper';
import { mockCreateTaskDto, mockLoginAccountDto } from './utils/mocks';
import { fixtureTasks } from './utils/fixtures';

describe('TaskController (e2e)', () => {
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
    await testDatabaseHelper.seedStates(moduleFixture.get(DataSource));
    await testDatabaseHelper.seedTasks(moduleFixture.get(DataSource));

    app = moduleFixture.createNestApplication();
    return await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when a user with role of business manager is logged in', () => {
    let token: string;
    let createdTaskId;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginAccountDto.BUSINESS_MANAGER)
        .expect(200);

      token = response.body.token;
    });

    // POST /tasks
    it('creates a new task', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(mockCreateTaskDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      const task = response.body;
      createdTaskId = task.id;

      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('startDate');
      expect(task).toHaveProperty('endDate');
      expect(task).toHaveProperty('project');
    });

    // GET /tasks
    it('returns a list of tasks', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const tasks = response.body;
      expect(tasks).toBeInstanceOf(Array);
      expect(tasks).toHaveLength(3);
    });

    // GET /tasks/:id
    it('returns a task by id', async () => {
      const id = fixtureTasks[0].id;
      const response = await request(app.getHttpServer())
        .get(`/tasks/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const task = response.body;
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('startDate');
      expect(task).toHaveProperty('endDate');
      expect(task).toHaveProperty('state');
      expect(task).toHaveProperty('project');
    });

    // PATCH /tasks/:id
    it('updates a task by id', async () => {
      const id = fixtureTasks[0].id;
      const response = await request(app.getHttpServer())
        .patch(`/tasks/${id}`)
        .send({ title: 'Recopilar nuevos requisitos' })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const task = response.body;
      expect(task.title).toBe('Recopilar nuevos requisitos');
    });

    // DELETE /tasks/:id
    it('deletes a task by id', async () => {
      const id = fixtureTasks[0].id;
      await request(app.getHttpServer())
        .delete(`/tasks/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    describe('when the user to whom the task is assigned has a lower role', () => {
      let assignedToId: string;

      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .get('/auth/lower-role-users')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

        assignedToId = response.body[0].id;
      });

      // PATCH /tasks/:id
      it('assigns a task to the user with lower role', async () => {
        const id = createdTaskId;
        const response = await request(app.getHttpServer())
          .patch(`/tasks/${id}`)
          .send({ assignedToId: assignedToId })
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

        const task = response.body;
        expect(task.assignedTo.id).toBe(assignedToId);
      });
    });
  });

  describe('when a user with role of technician is logged in', () => {
    let technicianToken: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginAccountDto.TECHNICIAN)
        .expect(200);

      technicianToken = response.body.token;
    });

    describe('when the states exists', () => {
      let states;
      // GET /states
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .get('/states')
          .expect(200);

        states = response.body;
        expect(states).toBeInstanceOf(Array);
        expect(states).toHaveLength(4);
      });

      describe('when the user has a task assigned', () => {
        let createdTaskId;
        beforeAll(async () => {
          const response = await request(app.getHttpServer())
            .post(`/tasks`)
            .send({ ...mockCreateTaskDto })
            .set('Authorization', `Bearer ${technicianToken}`)
            .expect(201);

          createdTaskId = response.body.id;
        });

        // PATCH /tasks
        it('change the state of a task', async () => {
          const id = createdTaskId;
          const response = await request(app.getHttpServer())
            .patch(`/tasks/${id}`)
            .send({ stateId: states[0].id })
            .set('Authorization', `Bearer ${technicianToken}`)
            .expect(200);

          const task = response.body;
          expect(task.state.name).toBe('To Do');
        });
      });
    });
  });
});
