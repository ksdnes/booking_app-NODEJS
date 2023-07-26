module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;

  const user = res.locals.user;
  const where = {
    email: user.email,
  };

  await Users.update(
    {
      status_mode: 0,
    },
    {
      where,
    }
  );
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};
