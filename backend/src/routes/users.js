const express = require("express");
const db = require("../db");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = db["User"];

// GET all users
router.get("/", function (req, res, next) {
  User.findAll().then((users) => {
    res.json(users);
  });
});

// POST create a new user (with password hashing)
router.post("/", async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hash = password ? await bcrypt.hash(password, 10) : undefined;
    const newUser = await User.create({ firstName, lastName, email, password: hash });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;