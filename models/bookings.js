//TODO: change the name of the table and the names of the colums to lowerCase
const Sequelize = require("sequelize");
const sequelize = require("../service/db.js");
const Apartments = require("./apartments.js");
const Bookings = sequelize.define(
  "bookings",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    apartment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      require: true,
      references: {
        model: "apartments",
        key: "id",
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    from: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    persons: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

module.exports = Bookings;
