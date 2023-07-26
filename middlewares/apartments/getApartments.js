const { Op, literal } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (objRep) => {
  const { Apartments, Bookings } = objRep;
  return async (req, res, next) => {
    //get the values from the url
    //do not validate the params because of the url..
    const priceFilter = req.query.pricefilter;
    res.locals.priceFilter = priceFilter;

    const capacityFilter = req.query.capacityfilter;
    res.locals.capacityFilter = capacityFilter;

    const fromFilter = req.query.fromfilter;
    res.locals.fromFilter = fromFilter;

    const toFilter = req.query.tofilter;
    res.locals.toFilter = toFilter;

    //condition for the price
    const priceCondition =
      priceFilter !== undefined ? { price: { [Op.lt]: priceFilter } } : "";

    //condition for the capacity
    const capacityCondition =
      capacityFilter !== undefined
        ? { maximum_capacity: { [Op.gt]: capacityFilter } }
        : "";
    let condition = {
      where: {
        ...priceCondition,
        ...capacityCondition,
      } /*
      include: [
        {
          model: Bookings,
          where: {
            [Op.and]: [
              {
                from: {
                  [Op.notBetween]: [fromFilter, toFilter],
                },
              },
              {
                to: {
                  [Op.notBetween]: [fromFilter, toFilter],
                },
              },
            ],
          },
        },
      ],*/,
    };

    try {
      const apartments = await Apartments.findAll(condition);
      res.locals.apartment = apartments;

      return next();
    } catch (err) {
      if (err) {
        const error = {
          status: 404,
          message:
            "Something went wrong.Please try again later. Thank you for your understading.",
        };
        return next(error);
      }
    }
  };
};
