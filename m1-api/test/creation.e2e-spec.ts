import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreationRepository } from '../src/creation/creation.repository';

describe('CreationController (e2e)', () => {
  let app: INestApplication;
  let creationRepository: CreationRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    creationRepository = moduleFixture.get<CreationRepository>(CreationRepository);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/creations (GET)', () => {
    it('should return an array of creations', async () => {
      const response = await request(app.getHttpServer())
        .get('/creations')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((creation) => {
        expect(creation).toHaveProperty('id');
        expect(creation).toHaveProperty('nomCreation');
      });
    });
  });

  describe('/creations (POST)', () => {
    it('should create a new creation', async () => {
      const creationData = { nomCreation: 'Nouvelle Création' };

      const response = await request(app.getHttpServer())
        .post('/creations')
        .send(creationData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nomCreation).toBe(creationData.nomCreation);
    });

    it('should return the existing creation if it already exists', async () => {
      const creationData = { nomCreation: 'Création Existante' };

      // Create the creation first
      await creationRepository.findOrCreate(creationData.nomCreation);

      const response = await request(app.getHttpServer())
        .post('/creations')
        .send(creationData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nomCreation).toBe(creationData.nomCreation);
    });
  });

  describe('/creations/available (GET)', () => {
    it('should return an array of available creations', async () => {
      const response = await request(app.getHttpServer())
        .get('/creations/available')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((creation) => {
        expect(creation).toHaveProperty('id');
        expect(creation).toHaveProperty('nomCreation');
      });
    });
  });
});
