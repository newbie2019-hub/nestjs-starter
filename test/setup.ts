import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import helmet from 'helmet';
import { CustomValidationPipe } from 'src/common/validation/custom-validation.pipe';
import { DatabaseService } from 'src/database/database.service';
import { CacheService } from 'src/core/cache/cache.service';
// import { ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;
  // let configService: ConfigService;
  let databaseService: DatabaseService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Copy what you have in main.ts to test the real app
    app.use(helmet());
    app.useGlobalPipes(
      new CustomValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();

    // Retrieving config service
    // configService = app.get(ConfigService);
    databaseService = app.get(DatabaseService);
    cacheService = app.get(CacheService);
    server = app.getHttpServer();
  });

  it('/ (GET)', async () => {
    // const env = configService.get(`environment`) as string;
    // console.log(`ENVIRONMENT: ${env}`);
    await databaseService.user.create({
      data: {
        email: 'sample@gmail.com',
        name: 'Michael Jordan',
      },
    });

    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }: { body: { data: any } }) => {
        expect(body.data).toBe('Hello World');
      });
  });

  // // 2nd Test
  // it('/ (GET)', async () => {
  //   const users = await databaseService.user.count();
  //   console.log(`1st Test Count, expecting 0: got ${users}`);

  //   return request(server)
  //     .get('/')
  //     .expect(200)
  //     .expect(({ body }: { body: { data: any } }) => {
  //       expect(body.data).toBe('Hello World');
  //     });
  // });

  afterAll(async () => {
    await app.close();
  });

  // Reset database and cache
  afterEach(async () => {
    await cacheService.reset();
    await databaseService.reset();
  });
});
