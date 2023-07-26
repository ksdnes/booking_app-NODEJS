module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  if (typeof req.body.email === "undefined") {
    return res.redirect("/passwordreset");
  }
  const emailadress = req.body.email;

  try {
    const findUser = await Users.findOne({
      where: { email: emailadress },
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
    };
    return next();
  } catch (err) {
    if (!err) {
      const error = {
        status: 404,
        message: "Error occurred while retrieving the user",
      };
      return next(error);
    }
  }
};
