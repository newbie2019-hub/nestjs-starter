import * as request from 'supertest';

describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }: { body: { data: any } }) => {
        expect(body.data).toBe('Hello World');
      });
  });
});
