const { configureModels } = require("./models/relations");
const express = require("express");
const bodyParser = require("body-parser");
const { uuid } = require("uuidv4");

const sequelize = require("./service/db");
const session = require("express-session");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const emailService = require("./service/email.js");

app.use(
  session({
    secret: "asdasdasdadsads",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

configureModels(sequelize).then(() => {
  const addRoutes = require("./route/index");
  addRoutes(app, uuid);

  app.listen(6004, function () {
    console.log("Running on 6004");
  });
});
