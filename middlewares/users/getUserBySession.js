module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  res.locals.loggedInUser = req.session.user.id;
  const findUser = await Users.findOne({
    where: { id: req.session.user.id },
  });
  if (!findUser) {
    const error = {
      status: 404,
      message: "No user found with the given email",
    };
    return next(error);
  }
  res.locals.user = {
    id: findUser.id,
    email: findUser.email,
    name: findUser.name,
    is_partner: findUser.is_partner,
    secret: findUser.secret,
    status_mode: findUser.status_mode,
  };
  return next();
};
