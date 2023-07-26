module.exports = (objRep) => async (req, res, next) => {
  const { Users, uuid, emailService } = objRep;
  const user = res.locals.user;

  //if condition matches, email okey
  try {
    const secret = uuid();
    await Users.update(
      {
        secret,
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
    //email kikuldése
    emailService.sendEmail(
      user.email,
      "Elfelejtett jelszó",
      `használd ezt a linket: https://localhost:6004/${user.id}/${secret}`
    );

    res.locals.userId = user.id;
    res.locals.secret = secret;

    return next();
    res.redirect(`/passwordreset/${res.locals.userId}/${res.locals.secret}`);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
