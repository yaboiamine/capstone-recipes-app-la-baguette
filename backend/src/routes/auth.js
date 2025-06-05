const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

const User = db["User"];
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(400).json({ error: "Email already in use" });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ firstName, lastName, email, password: hash });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, firstName, lastName, email } });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email } });
});

module.exports = router;