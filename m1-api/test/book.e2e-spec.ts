import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let bookId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (POST) - should create a book', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'Harry Potter',
        authorId: 1,
        publicationDate: '2001-06-26', // Ajout de la date de publication
      })
      .expect(201);
  
    bookId = response.body.id;
    expect(bookId).toBeDefined();
  });
  

  it('/books/:id (GET) - should get a book by id', () => {
    return request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.title).toBe('Harry Potter');
      });
  });

  it('/books/:id (PUT) - should update a book', () => {
    return request(app.getHttpServer())
      .put(`/books/${bookId}`)
      .send({ title: "Harry Potter and the Philosopher's Stone" })
      .expect(200)
      .expect((response) => {
        expect(response.body.title).toBe("Harry Potter and the Philosopher's Stone");
      });
  });

  it('/books/:id (DELETE) - should delete a book', () => {
    return request(app.getHttpServer())
      .delete(`/books/${bookId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
