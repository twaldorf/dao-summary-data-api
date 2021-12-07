import { app, server } from '../app'
import { agent as request } from 'supertest'

describe("GET /", () => {
    test("api index request", async () => {
      const response = await request(app).get("/")
      expect(response.body.response).toEqual("Index")
      expect(response.statusCode).toEqual(200)
    })
})

describe("Export CSV", () => {
    test("csv route request", async () => {
        const response = await request(app).get("/csv")
        expect(response.statusCode).toEqual(200)
        expect(response.body.response.includes('CSV Generated')).toEqual(true)
        expect(response.body.fileUrl ? true : false).toEqual(true)
    })
})

afterAll(async () => {
    server.close()
})