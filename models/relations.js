const Apartments = require("./apartments");
const Users = require("./users");
const Bookings = require("./bookings");
const Comments = require("./comments");

const configureModels = async (sequelize) => {
  await sequelize.sync();

  Users.hasMany(Apartments, { foreignKey: "user_id" });
  Users.hasMany(Comments, { foreignKey: "user_id" });
  Users.belongsToMany(Bookings, { through: "user_id" });

  Apartments.belongsToMany(Bookings, { through: "apartment_id" });
  Apartments.hasMany(Comments, { foreignKey: "apartment_id" });
  Apartments.belongsTo(Users);

  Comments.belongsTo(Apartments);
  Comments.belongsTo(Users);
};

module.exports.configureModels = configureModels;
