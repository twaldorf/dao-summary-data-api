import { app, server } from '../app'
import { agent as request } from 'supertest'

beforeAll(() => {

})

afterAll(async () => {
    server.close()
})

describe("GET /", () => {
    test("api index request", async () => {
      const response = await request(app).get("/")
      expect(response.body.response).toEqual("Index")
      expect(response.statusCode).toEqual(200)
    })
})

describe("Get a proposal", () => {
    test("request test proposal", async () => {
      const response = await request(app).get("/proposal/f3f19d40-17ff-11ec-ac84-77607720a240")
    //   expect(response.body.response).toEqual("Index")
      expect(response.statusCode).toEqual(200)
    })
})

// describe("Export CSV", () => {
//     test("csv route request", async () => {
//         const response = await request(app).get("/csv")
//         expect(response.statusCode).toEqual(200)
//         expect(response.body.response.includes('CSV Generated')).toEqual(true)
//         expect(response.body.fileUrl ? true : false).toEqual(true)
//     })
// })