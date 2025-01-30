const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Accounts = require("./Accounts");


const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
});

User.hasOne(Accounts);
Accounts.belongsTo(User);

module.exports = User;
