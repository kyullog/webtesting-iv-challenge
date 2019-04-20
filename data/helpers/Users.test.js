const Users = require("./Users.js");
const db = require("../dbConfig.js");

beforeEach(() => {
  return db("users").truncate();
});

describe("The add user helper function", () => {
  it("should add a single user to the database", async () => {
    await Users.addUser({ name: "Jonathan" });
    const userArray = await db("users");
    expect(userArray.length).toBe(1);
    expect(userArray[0].name).toBe("Jonathan");
  });
  it("should return the id and name", async () => {
    const newUser = await Users.addUser({ name: "Jonathan" });
    console.log("user", newUser);
    expect(newUser.id).toBe(1);
    expect(newUser.name).toBe("Jonathan");
  });
});
