import UserService from "../services/user.service.js";

const userService = UserService.getInstance();

const emailExists = async (email = '') => {
  // Verificar si el correo existe
  const user = await userService.getUser({ where: { email } });
  if (user) {
    throw new Error(`El correo ingresado ya existe, intente nuevamente.`);
  }
};

const tokenExists = async (token = '') => {
  // Verificar si el token existe
  try {
    const user = await userService.getUser({
      where: { token },
    });
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error(`!No encontramos un usuario asociado a este token!`);
    }
  }
};

export {
  emailExists,
  tokenExists
}
