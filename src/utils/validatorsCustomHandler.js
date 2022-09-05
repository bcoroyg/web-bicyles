import BicycleService from '../services/bicycle.service.js';
import UserService from '../services/user.service.js';

const userService = UserService.getInstance();
const bicycleService = BicycleService.getInstance();

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

const userEmailExists = async (email = '') => {
  // Verificar si el correo existe
  try {
    const user = await userService.getUser({
      where: { email },
    });
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error(`No existe el correo ingresado, intente nuevamente.`);
    }
  }
};

const tokenExpire = async (token = '') => {
  // Verificar si el token expiro
  try {
    const user = await userService.getUser({
      where: {
        token,
        expireToken: {
          $gt: Date.now(),
        },
      },
    });
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error(
        `¡No encontramos un usuario asociado a este token. Quizá haya expirado y debas solicitarlo nuevamente!`
      );
    }
  }
};

const notIsEmptyImage = (req) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files?.file) {
    throw new Error('La imagen es obligatoria');
  }
  return true;
};

const isImageValid = (req) => {
  if (req.files) {
    const { file } = req.files;
    // validando tipo de archivo
    if (file?.mimetype != 'image/jpeg' && file?.mimetype != 'image/png') {
      throw new Error('La imagen debe ser formato JPG o PNG');
    }
    //validando el tamaño del archivo
    if (file?.size > 500000) {
      throw new Error('La imagen debe ser menor a 500kb');
    }
    return true;
  }
  return true;
};

const bicycleIdExists = async (bicycleId = '') => {
  // Verificar si el id existe
  try {
    const bicycle = await bicycleService.getBicycleById({ bicycleId });
    if (!bicycle) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error(`!La bicicleta que desea actualizar no existe!`);
    }
  }
};

export {
  emailExists,
  tokenExists,
  userEmailExists,
  tokenExpire,
  notIsEmptyImage,
  isImageValid,
  bicycleIdExists,
};
