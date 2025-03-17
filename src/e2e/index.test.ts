import request from 'supertest';
import { Express } from "express";
import { createApp } from '../createApp';


describe("/api/users", () => {
  let app: Express;

  //This is necessary if the app needs to connect to a database.
  beforeAll(() => {
    app = createApp();
  });

  it("should return an empty array when getting /api/users", async() => {
    const response = await request(app).get("/api/users");
    expect(response.body).toStrictEqual([]);
  });

})