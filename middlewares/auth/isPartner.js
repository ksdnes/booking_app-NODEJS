module.exports = () => {
  return (req, res, next) => {
    if (req.session.user.is_partner === 1) {
      return next();
    }
    return res.redirect("/");
  };
};
