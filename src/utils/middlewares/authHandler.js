//revisar si el usuario esta autenticado o no
const authHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

export default authHandler;
