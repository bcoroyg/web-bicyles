import passport from 'passport';
import {
  LocalStrategy,
  GoogleStrategy,
  FacebookStrategy,
} from './strategies/index.js';

import { UserService } from '../../services/index.js';

const userService = UserService.getInstance();

//LocalStrategy - Login con credenciales propios (usuario y password)
passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(FacebookStrategy);
//serializar el usuario
passport.serializeUser((user, done) => done(null, user._id));
//deserializar el usuario
passport.deserializeUser(async (userId, done) => {
  const user = await userService.getUserById({ userId });
  return done(null, user);
});

export default passport;
