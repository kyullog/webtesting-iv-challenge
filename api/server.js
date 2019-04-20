const express = require("express");
const Users = require("../data/helpers/Users.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's alive!" });
});

server.post("/users", async (req, res) => {
  try {
    const newUser = await Users.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ err: "There was a problem adding user" });
  }
});

module.exports = server;
