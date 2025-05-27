var express = require("express");
const db = require("../db"); // Ensure this path is correct

var router = express.Router();

const User = db["User"]; // Assuming you have a User model defined in your models/index.js

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.findAll().then((users) => {
    res.json(users);
  });
});

module.exports = router;
