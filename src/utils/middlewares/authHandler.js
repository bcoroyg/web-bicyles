//revisar si el usuario esta autenticado o no
export const authHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
