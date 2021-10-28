const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sakic1milan",
  host: "localhost",
  port: "5432",
  database: "perntodo",
});

module.exports = pool;
