const server = require("./server.js");
const request = require("supertest");

describe("The Server", () => {
  it("is listening and responding", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
});
