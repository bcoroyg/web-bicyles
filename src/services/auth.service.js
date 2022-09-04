import models from '../database/models/index.js';

class AuthService {
  static _authServiceInstance = null;

  constructor() {}

  static getInstance() {
    if (!AuthService._authServiceInstance) {
      AuthService._authServiceInstance = new AuthService();
    }
    return AuthService._authServiceInstance;
  }

  async createUser({ user }) {
    const data = {
      ...user,
    };
    const createdUser = await models.User.create(data);
    createdUser.password = undefined;
    return createdUser;
  }
}

export default AuthService;
