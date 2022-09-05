import { check, body } from 'express-validator';
import validatorHandler from '../middlewares/validatorHandler.js';

const createBicycleValidator = [
  //Sanitizar
  body('color').escape(),
  body('model').escape(),
  //validar
  check('color', 'El color es obligatorio.').notEmpty(),
  check('model', 'El modelo es obligatorio.').notEmpty(),
  validatorHandler
];

export {
  createBicycleValidator
}
