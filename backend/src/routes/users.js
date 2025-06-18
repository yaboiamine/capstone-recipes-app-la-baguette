const express = require("express");
const db = require("../db");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = db["User"];

// GET all users - EXCLUDE PASSWORD HASHES FOR SECURITY
router.get("/", function (req, res, next) {
  // Use the 'attributes' option to specify which columns to include,
  // explicitly excluding 'password'.
  User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'] // List all attributes you want to expose, excluding 'password'
  })
  .then((users) => {
    res.json(users);
  })
  .catch(error => {
    // Basic error handling for the GET request
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  });
});

// POST create a new user (with password hashing)
router.post("/", async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hash = password ? await bcrypt.hash(password, 10) : undefined;
    const newUser = await User.create({ firstName, lastName, email, password: hash });
    
    // When responding after creation, also exclude the password from the returned user object
    const userWithoutPassword = { 
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("User creation error:", error);
    // Be more specific with status codes if possible, e.g., 409 for duplicate email
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
