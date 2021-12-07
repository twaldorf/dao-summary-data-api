import { app, server } from '../app'
import { agent as request } from 'supertest'

describe("GET /", () => {
    test("api index request", async () => {
      const response = await request(app).get("/");
      expect(response.body.response).toEqual("Index");
      expect(response.statusCode).toEqual(200);
    })
    afterAll(async () => {
        server.close()
    });
  })