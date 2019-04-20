const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

describe("The Server", () => {
  it("is listening and responding", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
  describe("POST /users", () => {
    beforeEach(() => {
      return db("users").truncate();
    });

    it("should create a new user and return the id/name", async () => {
      const testUser = { name: "Jonathan" };
      const res = await request(server).post("/users", testUser);
      expect(res.body).toEqual(testUser);
    });
  });
});
