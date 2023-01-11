import config from '../config/index.js';
import models from '../database/models/index.js';
import sendMail from '../utils/email/nodemailer.js';
import { tokenEmailHandler } from '../utils/index.js';

export class AuthService {
  static _authServiceInstance = null;

  constructor() {}

  static getInstance() {
    if (!AuthService._authServiceInstance) {
      AuthService._authServiceInstance = new AuthService();
    }
    return AuthService._authServiceInstance;
  }

  async createUser({ user, host }) {
    const data = {
      ...user,
    };
    if (host) {
      //Generar token de Email
      const tokenEmail = tokenEmailHandler({});
      //Creación de la url
      const url = `${host}/confirm-account/${tokenEmail.token}`;
      //Envio de correo
      sendMail({
        from: config.mailUser,
        to: data.email,
        subject: 'Activación de cuenta',
        file: 'confirm-account',
        url,
      });
      data.token = tokenEmail.token;
    }
    const createdUser = await models.User.create(data);
    createdUser.password = undefined;
    return createdUser;
  }

  async confirmAccountUser({ token }) {
    const user = await models.User.findOne({ token });
    //actualizando usuario a activo
    user.verified = true;
    user.token = undefined;
    await user.save();
    return user._id;
  }

  async forgotPassword({ email, host }) {
    const userDB = await models.User.findOne({ email });
    //Generar token de Email
    const tokenEmail = tokenEmailHandler({ expireToken: 3600000 });
    //Creación de la url
    const url = `${host}/reset-password/${tokenEmail.token}`;
    //Envio de correo
    sendMail({
      from: config.mailUser,
      to: email,
      subject: 'Recuperación de contraseña',
      file: 'reset-password',
      url,
    });
    userDB.token = tokenEmail.token;
    userDB.expireToken = tokenEmail.expireToken;
    const user = await userDB.save();
    return user._id;
  }

  async resetPassword({ token, password }) {
    const userDB = await models.User.findOne({ token });
    userDB.password = password;
    //limpiando token y expiración
    userDB.token = undefined;
    userDB.expireToken = undefined;
    //guardando la nueva contraseña
    const user = await userDB.save();
    return user._id;
  }
}
