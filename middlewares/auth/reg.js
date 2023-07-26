module.exports = (objRep) => async (req, res, next) => {
  const { Users } = objRep;
  const isPartner = req.body.isPartner === "true";
  console.log(isPartner);
  try {
    const newUser = await Users.create({
      email: req.body.email,
      name: req.body.userName,
      password: req.body.password,
      is_partner: isPartner,
    });
    if (!req.body.email || !req.body.userName || !req.body.password) {
      const error = {
        status: 404,
        message: "Please fill out all the fields.",
      };
      return next(error);
    }
    if (!newUser) {
      const error = {
        status: 404,
        message: "Cannot create a new user, please try again.",
      };
      return next(error);
    }
    res.locals.newUser = {
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      is_partner: newUser.is_partner, //false-> Basic User true->Parner
    };
    console.log("A new user have been created with email like :");
  } catch (err) {
    console.error("Error occurred while creating a new User:", err);
    return next(err);
  }
  return next();
};
