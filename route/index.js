//common middlewares
const renderMW = require("../middlewares/render");
const putTheIdToURLMW = require("../middlewares/putTheIdToURL");
const redirectMW = require("../middlewares/redirect");
const errorHandlerMW = require("../middlewares/errorHandler");
//apartments middlewares
const deleteBookingMW = require("../middlewares/apartments/deleteBooking");
const deletePartnerApartmentMW = require("../middlewares/apartments/deletePartnerApartment");
const getApartmentIndexMW = require("../middlewares/apartments/getApartmentIndex");
const getApartmentsMW = require("../middlewares/apartments/getApartments");
const getEditedPartnerApartmentMW = require("../middlewares/apartments/getEditedPartnerApartment");
const getPartnerApartmentsMW = require("../middlewares/apartments/getPartnerApartments");
const newPartnerApartmentMW = require("../middlewares/apartments/newPartnerApartment");
const patchEditedPartnerApartmentMW = require("../middlewares/apartments/patchEditedPartnerApartment");

//auth middlewares
const regMW = require("../middlewares/auth/reg");
const loginMW = require("../middlewares/auth/login");
const authMW = require("../middlewares/auth/auth");
const changePwdMW = require("../middlewares/auth/changePwd");
const sendForgotPwdMW = require("../middlewares/auth/sendForgotPwd");
const isPartnerMW = require("../middlewares/auth/isPartner");
const inverseAuth = require("../middlewares/auth/inverseAuth");
const logOutMW = require("../middlewares/auth/logOut");
//bookings middlewares
const getBookingsMW = require("../middlewares/bookings/getBookings");
const addBookingMW = require("../middlewares/bookings/addBooking");

//comments middlewares
const addCommentMW = require("../middlewares/comments/addComment");

//users middlewares
const getUserByEmailMW = require("../middlewares/users/getUserByEmail");
const getUserBySessionMW = require("../middlewares/users/getUserBySession");
const switchToPartnerMW = require("../middlewares/users/switchToPartner");
const switchToNormalMW = require("../middlewares/users/switchToNormal");
//MODELS
const Apartments = require("../models/apartments");
const Bookings = require("../models/bookings");
const Comments = require("../models/comments");
const Users = require("../models/users");

const emailService = require("../service/email.js");
const session = require("express-session");
function addRoutes(app, uuid) {
  const objRep = {
    Apartments,
    Comments,
    Users,
    Bookings,
    emailService,
    uuid,
  };

  app.use(
    session({
      secret: "fafkmalmfklamklfmdkl6kae",
      resave: false,
      saveUninitialized: true,
    })
  );
  //connections
  //Bookings.belongsTo(Apartments);
  //Apartments.hasMany(Bookings, { foreignKey: "apartmentID" });

  //users
  app.get(
    "/apartment/:id",
    authMW(),
    getUserBySessionMW(objRep),
    getApartmentIndexMW(objRep),
    renderMW(objRep, "oneApartmentPage")
  );
  app.get(
    "/apartment/:id/addcomment",
    authMW(),
    getUserBySessionMW(objRep),
    getApartmentIndexMW(objRep),
    renderMW(objRep, "addComment")
  );

  app.post(
    "/apartment/:id/addcomment",
    authMW(),
    getUserBySessionMW(objRep),
    addCommentMW(objRep),
    getApartmentIndexMW(objRep),
    renderMW(objRep, "oneApartmentPage")
  );
  app.post(
    "/apartment/:id/addbooking",
    authMW(objRep),
    getUserBySessionMW(objRep),
    addBookingMW(objRep),
    redirectMW("/")
    //(req, res, next) => {
    //  res.redirect("/");
    //}
  );
  app.post(
    "/apartment/:id/delete",
    authMW(objRep),
    deleteBookingMW(objRep),
    redirectMW("/")
  );
  //PARTNER
  app.get(
    "/apartments/:partnerid",
    authMW(objRep),
    getUserBySessionMW(objRep),
    isPartnerMW(objRep),
    getPartnerApartmentsMW(objRep),
    renderMW(objRep, "partner")
  );

  app.get(
    "/apartment/:partnerid/new",
    authMW(objRep),
    //isPartnerMW(objRep),
    getUserBySessionMW(objRep),
    renderMW(objRep, "addNewApartment")
  );
  app.post(
    "/apartment/:partnerid/new",
    authMW(objRep),
    getUserBySessionMW(objRep),
    newPartnerApartmentMW(objRep)
    //res is not
    //redirectMW(`/apartments/${res.locals.loggedInUser}`)
  );
  app.get(
    "/apartment/:partnerid/edit/:apartmentid",
    authMW(objRep),
    getUserBySessionMW(objRep),
    getEditedPartnerApartmentMW(objRep),
    getBookingsMW(objRep),
    renderMW(objRep, "oneApartmentEdit")
  );
  app.post(
    "/apartment/:partnerid/edit/:apartmentid",
    authMW(objRep),
    getUserBySessionMW(objRep),
    patchEditedPartnerApartmentMW(objRep)
  );

  app.get(
    "/apartment/:partnerid/delete/:apartmentid",
    authMW(objRep),
    getUserBySessionMW(objRep),
    deletePartnerApartmentMW(objRep)
  );

  //AUTH
  app.get(
    "/switchtoparter",
    authMW(objRep),
    getUserBySessionMW(objRep),
    switchToPartnerMW(objRep)
  );
  app.get(
    "/switchtonormal",
    authMW(objRep),
    getUserBySessionMW(objRep),
    switchToNormalMW(objRep)
  );
  app.get("/login", inverseAuth(objRep), renderMW(objRep, "login"));
  app.post(
    "/login",
    inverseAuth(objRep),
    loginMW(objRep),
    authMW(objRep),
    redirectMW("/")
  );
  app.get("/register", inverseAuth(objRep), renderMW(objRep, "reg"));
  app.post("/register", inverseAuth(objRep), regMW(objRep), redirectMW("/"));
  //do not working with redirectMW
  app.get(
    "/logout",
    authMW(objRep),
    getUserBySessionMW(objRep),
    logOutMW(objRep)
  );

  app.get("/passwordreset", inverseAuth(objRep), renderMW(objRep, "emailsend"));

  app.post(
    "/passwordreset",
    inverseAuth(objRep),
    getUserByEmailMW(objRep),
    sendForgotPwdMW(objRep)
  );
  app.get(
    "/passwordreset/:userID/:secret",
    inverseAuth(objRep),
    putTheIdToURLMW(objRep),
    renderMW(objRep, "passwordchange")
  );
  app.post(
    "/passwordreset/:userID/:secret",
    inverseAuth(objRep),
    changePwdMW(objRep),
    redirectMW("/")
  );
  app.get(
    "/",
    authMW(objRep),
    getUserBySessionMW(objRep),
    getApartmentsMW(objRep),
    renderMW(objRep, "index")
  );
  app.use(errorHandlerMW(objRep), renderMW(objRep, "error"));
}

module.exports = addRoutes;
