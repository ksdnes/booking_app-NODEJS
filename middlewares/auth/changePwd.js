module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  if (
    typeof req.params.userID === "undefined" ||
    typeof req.params.apartmentid === "undefined"
  ) {
    return res.redirect("/apartment/:partnerid");
  }
  const apartmentUrlID = req.params.apartmentid;
  const userUrlID = req.params.userID;
  const userUrlSecret = req.params.secret;
  try {
    const user = await Users.update(
      {
        password: req.body.newPassword,
      },
      {
        where: { id: userUrlID, secret: userUrlSecret },
        returning: true,
      }
    );
    if (!user) {
      const error = {
        status: 404,
        message: "No user found with the given ID",
      };
      return next(error);
    }
    console.log("Password changed succesfully, on userID: " + userUrlID);
    return next();
  } catch (err) {
    if (err) {
      const error = {
        status: 404,
        message: "something went wrong.",
      };
      return next(error);
    }
    return next(err);
  }
};
