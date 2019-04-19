const Users = require("./Users.js");
const db = require("../dbConfig.js");

beforeEach(() => {
  return db("users").truncate();
});

describe("The add user helper function", () => {
  it("should add a single user to the database", async () => {
    const newUser = await Users.addUser({ name: "Jonathan" });
    expect(newUser.length).toBe(1);
  });
});
