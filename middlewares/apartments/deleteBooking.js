module.exports = (objRep) => async (req, res, next) => {
  const { Bookings } = objRep;
  if (typeof req.params.id === "undefined") {
    const error = {
      status: 404,
      message: "Cannot delete the booking. Please try again.",
    };
    //return res.redirect("/apartment/:id");
    return next(error);
  }

  const bookingID = req.params.id;
  try {
    const booking = await Bookings.destroy({
      where: { id: bookingID },
    });
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    return next();
  } catch (err) {
    console.error("Error occurred while retrieving booking:", err);
    return next(err);
  }
};
