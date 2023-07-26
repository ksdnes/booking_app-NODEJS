//db connection
// Option 3: Passing parameters separately (other dialects)
const Sequelize = require("sequelize");
const sequelize = new Sequelize("book_apartment", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    //https://stackoverflow.com/questions/20386402/sequelize-unknown-column-createdat-in-field-list
  },
}); /*
sequelize
  .sync()
  .then(() => {
    console.log("Connection to DB was successful");
  })
  .catch((err) => {
    console.error("Unable to connect to DB", err);
  });*/
module.exports = sequelize;
