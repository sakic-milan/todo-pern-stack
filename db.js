const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig =
  "postgres://dhelyqvbgrsymh:55dd3e400a722de6d0a5abccfdca2baf0a79f1b8df8edc7e91ee599ee6c5d03f@ec2-3-233-55-123.compute-1.amazonaws.com:5432/dcgkra10ejqqtq";

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

module.exports = pool;
