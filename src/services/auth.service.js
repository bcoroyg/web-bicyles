import config from '../config/index.js';
import models from '../database/models/index.js';
import sendMail from '../utils/email/nodemailer.js';
import tokenEmailHandler from '../utils/tokenEmailHandler.js';

class AuthService {
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
    //Generar token de Email
    const tokenEmail = tokenEmailHandler({});
    data.token = tokenEmail.token;
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
}

export default AuthService;
