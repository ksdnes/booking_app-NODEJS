const Sequelize = require("sequelize");
const sequelize = require("../service/db.js");

const Users = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_partner: {
      type: Sequelize.INTEGER,
    },
    secret: {
      type: Sequelize.STRING,
    },
    status_mode: {
      type: Sequelize.INTEGER,
    },
  },
  { underscored: true }
);

module.exports = Users;
