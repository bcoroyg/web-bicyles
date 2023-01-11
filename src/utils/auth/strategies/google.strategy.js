import { Strategy } from 'passport-google-oauth20';
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import config from '../../../config/index.js';
import { UserService, AuthService } from '../../../services/index.js';


const userService = UserService.getInstance();
const authService = AuthService.getInstance();

export const GoogleStrategy = new Strategy(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: `${config.host}/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.getUser({
        where: {
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        },
      });
      if (!user) {
        const newUser = {
          name: profile.displayName || 'SIN NOMBRE',
          email: profile.emails[0].value,
          password: await bcrypt.hash(shortid.generate(), 10),
          verified: true,
          googleId: profile.id,
        };
        const createdUser = await authService.createUser({ user: newUser });
        return done(null, createdUser);
      }
      //Eliminando contraseña de la respuesta
      user.password = undefined;
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
