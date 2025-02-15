const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./User");

const Expense = db.define("Expense", {
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;