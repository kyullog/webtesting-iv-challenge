const db = require("../dbConfig.js");

module.exports = {
  addUser: async user => {
    const [id] = await db("users").insert(user);
    return db("users")
      .where({ id })
      .first();
  }
};
