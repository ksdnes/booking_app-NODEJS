module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  if (
    typeof req.params.userID === "undefined" ||
    typeof req.params.secret === "undefined"
  ) {
    return res.redirect("/");
  }
  const userUrlID = req.params.userID;
  const userUrlSecret = req.params.secret;
  res.locals.userID = userUrlID;
  res.locals.secret = userUrlSecret;
  return next();
};
