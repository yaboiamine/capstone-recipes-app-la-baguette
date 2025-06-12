require("dotenv").config();
const express = require("express");
const cors = require("cors");

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const recipesRouter = require("./routes/recipes.js");
const authRouter = require("./routes/auth.js"); // <-- Add this line

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/auth", authRouter); // <-- And this line

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
