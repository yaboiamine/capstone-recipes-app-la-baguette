const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Assuming db.js exports your Sequelize models
const router = express.Router();

const User = db["User"];
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields (first name, last name, email, password) are required." });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const hash = await bcrypt.hash(password, 10);
    
    // Ensure the 'password' attribute is being passed to User.create with the hashed value
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password: hash // This is crucial. Make sure your User model *defines* this attribute.
    });

    // Generate JWT token for the newly signed-up user
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    // Respond with token and relevant user data (exclude password hash)
    res.status(201).json({ token, user: { id: user.id, firstName, lastName, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "An error occurred during signup." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // IMPORTANT: Explicitly include the 'password' attribute when finding the user
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'firstName', 'lastName', 'email', 'password'] // Ensure 'password' is included in the query result
    });

    if (!user) {
      // User not found
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Now, user.password should contain the hashed password from the database
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // Passwords do not match
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate JWT token for the authenticated user
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    // Respond with token and relevant user data (exclude password hash from response)
    res.status(200).json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    // Catch any unexpected errors during the login process
    res.status(500).json({ error: "An error occurred during login." });
  }
});

module.exports = router;
