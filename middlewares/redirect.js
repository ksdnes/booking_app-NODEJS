module.exports = (to) => {
  return (req, res, next) => {
    return res.redirect(to);
  };
};
