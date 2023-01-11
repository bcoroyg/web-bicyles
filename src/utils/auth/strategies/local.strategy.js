import { Strategy } from 'passport-local';
import { UserService } from '../../../services/index.js';

const userService = UserService.getInstance();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await userService.getUser({ where: { email } });

      //Verifica si el usuario existe
      if (!user) {
        return done(null, false, {
          message: 'Correo y/o contraseña incorrecta.',
        });
      }

      //Verifica si el password es correcto
      if (!(await user.verifyPassword(password))) {
        return done(null, false, {
          message: 'Correo y/o  contraseña incorrecta.',
        });
      }

      if (!user.verified) {
        return done(null, false, {
          message: 'Debe Activar su cuenta.',
        });
      }
      //Eliminando contraseña de la respuesta
      user.password = undefined;
      //retorna el usuario
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
