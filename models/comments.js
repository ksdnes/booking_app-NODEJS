const Sequelize = require("sequelize");
const sequelize = require("../service/db.js");
const Comments = sequelize.define(
  "comments",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    apartment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "apartments",
        key: "id",
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

module.exports = Comments;
