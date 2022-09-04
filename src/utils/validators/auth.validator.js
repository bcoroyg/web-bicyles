import { check, body } from 'express-validator';
import validatorHandler from '../middlewares/validatorHandler.js';
import {
  emailExists,
  tokenExists,
  tokenExpire,
  userEmailExists,
} from '../validatorsCustomHandler.js';

const createUserValidator = [
  //Sanitizar
  body('name').escape(),
  body('email').escape(),
  body('password').escape(),
  body('confirmPassword').escape(),
  //validar
  check('name', 'El nombre es obligatorio.').notEmpty(),
  check('email', 'El correo es obligatorio.').notEmpty(),
  check('email').custom(emailExists),
  check('password', 'La contraseña es obligatoria.').notEmpty(),
  check('confirmPassword', 'Confirmar contraseña es obligatoria.').notEmpty(),
  check('confirmPassword', 'La contraseña no coincide, intente nuevamente.')
    .not()
    .custom((value, { req }) => req.body.password !== value),
  validatorHandler,
];

const confirmAccountAuthValidator = [
  check('token').custom(tokenExists),
  validatorHandler,
];

const forgotPasswordAuthValidator = [
  //Sanitizar
  body('email').escape(),
  //Validar
  check('email').custom(userEmailExists),
  check('email', 'El correo es obligatorio.').notEmpty(),
  validatorHandler,
];

const getResetPasswordAuthValidator = [
  check('token').custom(tokenExpire),
  validatorHandler,
];

const resetPasswordAuthValidator = [
  //Sanitizar
  body('password').escape(),
  body('confirmPassword').escape(),
  //Validar
  check('token').custom(tokenExpire),
  check('password', 'La contraseña es obligatoria.').notEmpty(),
  check('confirmPassword', 'Confirmar contraseña es obligatoria.').notEmpty(),
  check('confirmPassword', 'La contraseña no coincide, intente nuevamente.')
    .not()
    .custom((value, { req }) => req.body.password !== value),
  validatorHandler,
];

export {
  createUserValidator,
  confirmAccountAuthValidator,
  forgotPasswordAuthValidator,
  getResetPasswordAuthValidator,
  resetPasswordAuthValidator,
};
