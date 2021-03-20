const { Sequelize } = require("sequelize");
const Configuration = require("../../config/GeneralConfiguration");

const sequelize = new Sequelize(
  Configuration.database.DB_NAME,
  Configuration.database.DB_USER,
  Configuration.database.DB_PASSWORD,
  {
    host: Configuration.database.DB_HOST,
    dialect: "postgres",
  }
);

module.exports = sequelize;
