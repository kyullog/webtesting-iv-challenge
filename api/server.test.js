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
});
