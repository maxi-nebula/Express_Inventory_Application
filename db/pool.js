const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "inventory",
  password: "101ei140",
  port: 5432,
});
