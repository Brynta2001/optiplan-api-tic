import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';
import { TestDatabaseHelper } from './utils/helpers/test-database.helper';
import { mockCreateAccountDto, mockLoginAccountDto } from './utils/mocks';

describe('AuthController', () => {
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

    app = moduleFixture.createNestApplication();
    return await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when a user is not signed up', () => {
    // POST /auth/register
    it('signs up a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(mockCreateAccountDto)
        .expect(201);

      const account = response.body;
      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('roles');
    });
  });

  describe('when a user is not logged in', () => {
    // POST /auth/login
    it('returns a token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginAccountDto.BUSINESS_MANAGER)
        .expect(200);

      const token = response.body.token;
      expect(token).toBeDefined();
    });
  });

  describe('when a user is logged in', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginAccountDto.BUSINESS_MANAGER)
        .expect(200);

      token = response.body.token;
    });

    // GET /auth/lower-role-users
    it('returns users with lower role', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/lower-role-users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const accounts = response.body;
      expect(accounts).toHaveLength(1);
    });
  });
});
