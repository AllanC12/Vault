const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("../models/User");

const Revenue = db.define("Revenue", {
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Revenue);
Revenue.belongsTo(User);

module.exports = Revenue;
