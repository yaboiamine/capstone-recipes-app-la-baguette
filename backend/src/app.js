require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const { Sequelize } = require("sequelize");

const PORT = 3000;

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/ecommerce-lab3",
  { logging: false }
);

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ title: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
