module.exports = () => {
  return (req, res, next) => {
    if (typeof req.session.user === "undefined") {
      return res.redirect("/login");
    }
    return next();
  };
};
