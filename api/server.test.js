const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

describe("The Server", () => {
  it("is listening and responding", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
  beforeEach(() => {
    return db("users").truncate();
  });
  describe("POST /users", () => {
    it("should respond with status code 201 on successful addition", async () => {
      const testUser = { name: "Jonathan" };
      const res = await request(server)
        .post("/users")
        .send(testUser);
      expect(res.status).toBe(201);
    });
    it("should create a new user and return the id/name", async () => {
      const testUser = { name: "Jonathan" };
      const res = await request(server)
        .post("/users")
        .send(testUser);
      expect(res.body).toEqual({ id: 1, name: "Jonathan" });
    });
    it("should respond with status 500 if no data is posted", async () => {
      const res = await request(server).post("/users");
      expect(res.status).toBe(500);
    });
  });
  describe("POST /users/id/delete", () => {
    it("should respond with status code 200 on successful delete", async () => {
      await db("users").insert({ name: "Jonathan" });
      const res = await request(server).post("/users/1/delete");
      expect(res.status).toBe(200);
    });
    it("should return a 404 status if invalid user id used", async () => {
      await db("users").insert({ name: "Jonathan" });
      const res = await request(server).post("/users/3/delete");
      expect(res.status).toBe(404);
    });
  });
});
