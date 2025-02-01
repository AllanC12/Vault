const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("../models/User");

const Revenue = db.define("Revenue", {
  value: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Revenue);
Revenue.belongsTo(User);
