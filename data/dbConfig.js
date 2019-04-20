require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile.js");

environment = process.env.DB_ENV || "development";
module.exports = knex(config[environment]);
