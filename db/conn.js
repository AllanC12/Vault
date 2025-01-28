require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DATABASE, HOST, USER, PASSWORD, PORT } = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  port: PORT,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  timezone: "-03:00",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}

testConnection();

module.exports = sequelize;
