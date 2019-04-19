const server = require("./server.js");
const request = require("supertest");

describe("The Server", () => {
  it("is listening", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
});
