module.exports = (objRep, templeteFile) => (req, res) => {
  const { user } = res.locals; // Assuming the user information is stored in res.locals.user
  console.log(user);
  res.render(templeteFile, { user });
};
