import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { INestApplication } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Keyv } from 'cacheable';

describe('AppService', () => {
  let appService: AppService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init(); // Initialize the Nest application

    appService = app.get<AppService>(AppService);
  });

  afterAll(async () => {
    if (app) {
      const cacheManager = app.get<Cache>(CACHE_MANAGER);
      const stores = (cacheManager as any).store?.stores;

      if (Array.isArray(stores)) {
        for (const store of stores) {
          if (store && typeof store?.disconnect === 'function') {
            try {
              await (store as Keyv).disconnect();
            } catch (error) {
              console.error(
                'Error disconnecting Keyv Redis in test teardown:',
                error,
              );
            }
          }
        }
      }

      // 3. Close the NestJS application instance
      await app.close();
    }
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appService.getHello()).toBe('Hello World!');
    });
  });
});
