module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  const user = res.locals.user;
  try {
    await Users.update(
      {
        status_mode: 0,
      },
      {
        where: { email: user.email },
      }
    );
    if (!user) {
      const error = {
        status: 404,
        message: "User not found.",
      };
      return next(error);
    }
    return req.session.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`/apartments/${user.id}`);
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
