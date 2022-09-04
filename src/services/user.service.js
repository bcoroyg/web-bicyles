import models from '../database/models/index.js';

class UserService {
  static _userServiceInstance = null;

  constructor() {}

  static getInstance() {
    if (!UserService._userServiceInstance) {
      UserService._userServiceInstance = new UserService();
    }
    return UserService._userServiceInstance;
  }

  async getUserById({ userId }) {
    const user = await models.User.findById(userId);
    //Eliminando contraseña en la respuesta
    user.password = undefined;
    return user;
  }

  async getUser({ where }) {
    const user = await models.User.findOne(where);
    return user;
  }
}

export default UserService;
