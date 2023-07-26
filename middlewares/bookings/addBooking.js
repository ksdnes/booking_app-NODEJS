module.exports = (objRep) => async (req, res, next) => {
  const { Bookings } = objRep;
  if (
    typeof req.params.id === "undefined" ||
    typeof res.locals.loggedInUser === "undefined"
  ) {
    return res.redirect("/");
  }
  const apartmentID = req.params.id;
  const userID = res.locals.loggedInUser;

  try {
    const newBooking = await Bookings.create({
      apartment_id: apartmentID,
      user_id: userID,
      from: req.body.from,
      to: req.body.to,
      persons: req.body.persons,
    });

    if (!newBooking) {
      const error = {
        status: 404,
        message: "Cannot create a new booking.The new booking was not created.",
      };
      return next(error);
    }
  } catch (err) {
    if (err) {
      const error = {
        status: 404,
        message: "Error occurred while creating a new Booking.",
      };
      return next(error);
    }
  }
  return next();
};
