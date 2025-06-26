const express = require("express");
const db = require("../db");
const router = express.Router();

const Recipe = db["Recipe"];

// GET all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.findAll();
  res.json(recipes);
});

// POST create a new recipe
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newRecipe = await Recipe.create({ title, description });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    
    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;