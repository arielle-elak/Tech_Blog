// Standard config
const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        // Disabled for heroku Deploy || host: "localhost",
        dialect: "mysql",
        port: process.env.PORT || 3000,
      }
    );
console.log("Established sequelize config...");

module.exports = sequelize;
