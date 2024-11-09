import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('greetMe', () => {
    it('should return a personalized greeting', () => {
      const name = 'Simon';
      expect(appController.greetMe(name)).resolves.toBe(`Hello ${name}`);
    });
  });
  
});
