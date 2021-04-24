const { DataTypes } = require("sequelize");
const sequelize = require("../../../core/database");

const Verification = sequelize.define("VerificationTokens", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Verification;
