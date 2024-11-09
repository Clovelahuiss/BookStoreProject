import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;
  let authorId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/authors (POST) - should create an author', () => {
    return request(app.getHttpServer())
      .post('/authors')
      .send({ name: 'J.K. Rowling' })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        authorId = response.body.id;
      });
  });

  it('/authors (GET) - should get all authors', () => {
    return request(app.getHttpServer())
      .get('/authors')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/authors (GET) - should get all authors with pagination', () => {
    return request(app.getHttpServer())
      .get('/authors?limit=5&offset=0')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/authors/:id (GET) - should get an author by id', () => {
    return request(app.getHttpServer())
      .get(`/authors/${authorId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toBe('J.K. Rowling');
      });
  });

  it('/authors/:id (PUT) - should update an author', () => {
    return request(app.getHttpServer())
      .put(`/authors/${authorId}`)
      .send({ name: 'Joanne Rowling' })
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toBe('Joanne Rowling');
      });
  });

  it('/authors/:id (DELETE) - should delete an author', () => {
    return request(app.getHttpServer())
      .delete(`/authors/${authorId}`)
      .expect(200);
  });
});