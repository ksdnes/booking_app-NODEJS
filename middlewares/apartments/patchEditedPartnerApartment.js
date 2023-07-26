module.exports = (objRep) => async (req, res, next) => {
  const { Apartments } = objRep;
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.maximumCapacity === "undefined" ||
    typeof req.body.price === "undefined" ||
    typeof req.params.partnerid === "undefined" ||
    typeof req.params.apartmentid === "undefined"
  ) {
    return res.redirect("/apartment/:partnerid");
  }
  const partnerUrlID = req.params.partnerid;
  const apartmentUrlID = req.params.apartmentid;
  try {
    const apartman = await Apartments.update(
      {
        name: req.body.name,
        price: req.body.price,
        maximum_capacity: req.body.maximumCapacity,
      },
      {
        where: { id: apartmentUrlID, user_id: partnerUrlID },
      }
    );
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
    res.redirect(`/apartments/${res.locals.loggedInUser}`);
  } catch (err) {
    if (!apartman) {
      const error = {
        status: 404,
        message: "An error occurred while retrieving apartment:",
      };
      return next(error);
    }
    return next(err);
  }
};
