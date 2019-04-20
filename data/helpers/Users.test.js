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
    expect(newUser.id).toBe(1);
    expect(newUser.name).toBe("Jonathan");
  });
});

describe("The delete user helper function", () => {
  it("should delete the user with the specified id", async () => {
    await db("users").insert([{ name: "Jonathan" }, { name: "Billiam" }]);
    await Users.remove(1);
    const checkUsers = await db("users");
    expect(checkUsers.length).toBe(1);
    expect(checkUsers[0].name).toBe("Billiam");
  });
  it("should return the number of records deleted", async () => {
    await db("users").insert([{ name: "Jonathan" }, { name: "Billiam" }]);
    const res = await Users.remove(2);
    expect(res).toBe(1);
  });
  it("should return 0 if no records are deleted", async () => {
    const res = await Users.remove(1);
    expect(res).toBe(0);
  });
});
