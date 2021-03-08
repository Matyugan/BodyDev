const { Sequelize } = require("sequelize");
const Configuration = require("../../utils/Configuration");

const sequelize = new Sequelize(
  Configuration.database.DB_NAME,
  Configuration.database.DB_USER,
  Configuration.database.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = sequelize;
