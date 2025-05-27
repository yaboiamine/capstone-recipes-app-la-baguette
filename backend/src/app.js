require("dotenv").config();
const express = require("express");
const pg = require("pg");
const { Pool } = require("pg");
const { Sequelize } = require("sequelize");

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");

const PORT = 3000;

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
