const { Sequelize, DataTypes } = require('sequelize');
const config = require('./src/db/config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: console.log, // Set to false to disable SQL logging
  }
);

// Import models
const User = require('./src/db/models/user')(sequelize, DataTypes);
const Recipe = require('./src/db/models/recipe')(sequelize, DataTypes);

// Define associations here if needed
// User.hasMany(Recipe);
// Recipe.belongsTo(User);

// Export models and sequelize instance
const db = {
  sequelize,
  Sequelize,
  User,
  Recipe
};

module.exports = db;