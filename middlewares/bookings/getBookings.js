module.exports = (objRep) => async (req, res, next) => {
  const { Bookings } = objRep;
  const apartmentID = res.locals.oneApartment;
  try {
    const getBookings = await Bookings.findAll({
      where: {
        apartment_id: apartmentID.id,
      },
    });
    res.locals.bookings = getBookings;
    if (!getBookings) {
      const error = {
        status: 404,
        message: "Cannot get the Bookings.",
      };
      return next(error);
    }
  } catch (err) {
    if (!getBookings) {
      const error = {
        status: 404,
        message:
          "Cannot get the Bookings.An error occurred while querying the bookings",
      };
      return next(error);
    }
  }
  return next();
};
