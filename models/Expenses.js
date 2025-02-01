const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./User");

const Expense = db.define("Expense", {
  value: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Expense);
Expense.belongsTo(User);
