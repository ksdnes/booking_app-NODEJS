module.exports = (objRep) => async (req, res, next) => {
  const { Apartments } = objRep;
  if (
    typeof req.params.partnerid === "undefined" ||
    typeof req.params.apartmentid === "undefined"
  ) {
    return res.redirect("/apartment/:partnerid");
  }
  const partnerUrlID = req.params.partnerid;
  const apartmentUrlID = req.params.apartmentid;
  try {
    const apartman = await Apartments.destroy({
      where: { id: apartmentUrlID, user_id: partnerUrlID },
    });
    if (!apartman) {
      const error = {
        status: 404,
        message: "Apartment not found",
      };
      //res.redirect(`/apartments/${res.locals.loggedInUser}`);
      return next(error);
    }
  } catch (err) {
    console.error("Error occurred while retrieving apartment:", err);
    return next(err);
  }
};
