module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  if (!req.body.email || !req.body.password) {
    const error = {
      status: 404,
      message: "Email and password is required. Please enter a valid value.",
    };
    return next(error);
  }

  const isPartner = req.body.isPartner === "true";
  const where = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await Users.findOne({
    where,
  });

  if (!user) {
    const error = {
      status: 404,
      message:
        "User not found with the entered email or password. Please try again.",
    };
    return next(error);
  }
  req.session.user = user;

  return req.session.save((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect(`/apartments/${user.id}`);
  });
};
