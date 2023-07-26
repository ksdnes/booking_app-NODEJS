module.exports = (objRep) => async (req, res, next) => {
  const { Apartments } = objRep;

  if (
    typeof req.params.partnerid === "undefined" ||
    typeof req.params.apartmentid === "undefined"
  ) {
    const error = {
      status: 404,
      message: "Invalid values in the URL.",
    };
    return next(error);
  }
  // return res.redirect("/apartment/:partnerid");
  const partnerUrlID = req.params.partnerid;
  const apartmentUrlID = req.params.apartmentid;
  try {
    const apartman = await Apartments.findOne({
      where: { id: apartmentUrlID, user_id: partnerUrlID },
    });
    if (!apartman) {
      const error = {
        status: 404,
        message: "No apartment found with the given ID.",
      };
      return next(error);
    }
    res.locals.oneApartment = {
      id: apartman.id,
      name: apartman.name,
      price: apartman.price,
      ownerID: apartman.user_id,
      maximumCapacity: apartman.maximum_capacity,
    };
    return next();
  } catch (err) {
    if (err) {
      const error = {
        status: 404,
        message: "Something went wrong.Please try again later.",
      };
      return next(error);
    }
  }
};
