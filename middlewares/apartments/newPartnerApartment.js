module.exports = (objRep) => async (req, res, next) => {
  const { Apartments } = objRep;
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.maximumCapacity === "undefined" ||
    typeof req.body.price === "undefined"
  ) {
    return res.redirect("/apartment/:partnerid");
  }
  try {
    const newApartment = await Apartments.create({
      user_id: res.locals.loggedInUser,
      name: req.body.name,
      maximum_capacity: req.body.maximumCapacity,
      price: req.body.price,
    });
    if (!newApartment) {
      const error = {
        status: 404,
        message:
          "Cannot create a new Apartment. A new Apartment not been created.Please try again.",
      };
      return next(error);
    }
  } catch (err) {
    if (err) {
      const error = {
        status: 404,
        message: "Something went wrong.Please try again.",
      };
      return next(error);
    }
  }
  res.redirect(`/apartments/${res.locals.loggedInUser}`);
};
