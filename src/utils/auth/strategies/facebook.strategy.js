import { Strategy } from 'passport-facebook';
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import config from '../../../config/index.js';
import UserService from '../../../services/user.service.js';
import AuthService from '../../../services/auth.service.js';

const userService = UserService.getInstance();
const authService = AuthService.getInstance();

const FacebookStrategy = new Strategy(
  {
    clientID: config.facebookId,
    clientSecret: config.facebookSecret,
    callbackURL: `${config.host}/facebook/callback`,
    profileFields: ['displayName', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.getUser({
        where: {
          $or: [{ facebookId: profile.id }, { email: profile.emails[0].value }],
        },
      });

      if (!user) {
        const newUser = {
          name: profile.displayName || 'SIN NOMBRE',
          email: profile.emails[0].value,
          password: await bcrypt.hash(shortid.generate(), 10),
          verified: true,
          facebookId: profile.id,
        };
        const createdUser = await authService.createUser({ user: newUser });
        return done(null, createdUser);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

export default FacebookStrategy;
