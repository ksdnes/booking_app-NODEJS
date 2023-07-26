module.exports = (objRep) => async (err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message;
  res.locals.error = err;
  console.log(res.locals.error);
  return res.status(status).render("error", res.locals);
};
