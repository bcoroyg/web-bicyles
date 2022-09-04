import UserService from "../services/user.service.js";

const userService = UserService.getInstance();

const emailExists = async (email = '') => {
  // Verificar si el correo existe
  const user = await userService.getUser({ where: { email } });
  if (user) {
    throw new Error(`El correo ingresado ya existe, intente nuevamente.`);
  }
};

export {
  emailExists
}
