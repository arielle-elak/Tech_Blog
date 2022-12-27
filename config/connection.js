// Standard config
const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: "localhost",
        dialect: "mysql",
        port: process.env.PORT,
      }
    );
console.log("Established sequelize config...");

module.exports = sequelize;
