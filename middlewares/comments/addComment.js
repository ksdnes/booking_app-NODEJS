module.exports = (objRep) => async (req, res, next) => {
  const { Comments, Bookings } = objRep;
  if (typeof req.params.id === "undefined") {
    return res.redirect("/");
  }
  const apartmentID = req.params.id;
  const userID = res.locals.loggedInUser;

  try {
    //have the user been here? in case of no, cannot write a comment
    const haveBeenthere = await Bookings.findOne({
      where: { apartment_id: apartmentID, user_id: userID },
    });
    if (!haveBeenthere) {
      const error = {
        status: 404,
        message:
          "Please book an appointment in order to grant acces to write comment",
      };
      return next(error);
    }
  } catch (err) {
    if (err) {
      const error = {
        status: 404,
        message: "Something went wrong.Please try again later.",
      };
      return next(error);
    }
  }
  try {
    //create a comment
    const newComment = await Comments.create({
      apartment_id: apartmentID,
      user_id: userID,
      description: req.body.message,
    });

    if (!newComment) {
      const error = {
        status: 404,
        message: "Cannot create a new Comment.A new Comment not been added",
      };
      return next(error);
    }
  } catch (err) {
    console.error("Error occurred while creating a new comment:", err);
    return next(err);
  }
  return next();
};
