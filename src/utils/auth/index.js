import passport from 'passport';
import LocalStrategy from './strategies/local.strategy.js';
import GoogleStrategy from './strategies/google.strategy.js';

import UserService from '../../services/user.service.js';
const userService = UserService.getInstance();

//LocalStrategy - Login con credenciales propios (usuario y password)
passport.use(LocalStrategy);
passport.use(GoogleStrategy);

//serializar el usuario
passport.serializeUser((user, done) => done(null, user._id));
//deserializar el usuario
passport.deserializeUser(async (userId, done) => {
  const user = await userService.getUserById({ userId });
  return done(null, user);
});

export default passport;
