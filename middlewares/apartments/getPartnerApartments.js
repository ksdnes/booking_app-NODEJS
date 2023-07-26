module.exports = (objRep) => {
  const { Apartments } = objRep;
  return async (req, res, next) => {
    try {
      const apartments = await Apartments.findAll({
        where: { user_id: res.locals.loggedInUser },
      });

      res.locals.partnerApartments = apartments;
      return next();
    } catch (err) {
      if (err) {
        const error = {
          status: 404,
          message: "Something went wrong. Please try again.",
        };
        return next(error);
      }
    }
  };
};
