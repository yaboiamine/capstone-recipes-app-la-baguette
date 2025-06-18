"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Email should generally be required
        unique: true,     // Email should be unique
      },
      password: { // <--- THIS IS THE MISSING PART!
        type: DataTypes.STRING,
        allowNull: false, // As per your database constraint
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // Explicitly define tableName to avoid potential pluralization issues, though 'Users' is default
    }
  );
  return User;
};
