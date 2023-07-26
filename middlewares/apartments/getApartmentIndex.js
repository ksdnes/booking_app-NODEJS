module.exports = (objRep) => async (req, res, next) => {
  const { Apartments, Comments } = objRep;
  const urlID = req.params.id;
  if (typeof req.params.id === "undefined") {
    return res.redirect("/");
  }
  try {
    const apartman = await Apartments.findOne({
      where: { id: urlID },
    });

    if (!apartman) {
      const error = {
        status: 404,
        message: "No apartment found with the given ID",
      };
      //res.redirect(`/apartments/${res.locals.loggedInUser}`);
      return next(error);
    }
    res.locals.oneApartment = {
      id: apartman.id,
      name: apartman.name,
      price: apartman.price,
      maximumCapacity: apartman.maximumCapacity,
      ownerID: apartman.user_id,
    };
  } catch (err) {
    console.error("Error occurred while retrieving apartment:", err);
    return next(err);
  }
  try {
    const comments = await Comments.findAll({
      where: { apartment_id: urlID },
    });

    const commentDescriptions = comments.map((comment) => comment.description);
    res.locals.oneComment = commentDescriptions;
    return next();
  } catch (err) {
    console.error("Error occurred while retrieving comments:", err);
    return next(err);
  }
};
