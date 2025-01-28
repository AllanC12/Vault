const {DataTypes} = require("sequelize")
const db = require("../db/conn")

const Accounts = db.define("Accounts", {
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    expenses: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    revenues: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
})

module.exports = Accounts