import { check, body } from 'express-validator';
import validatorHandler from '../middlewares/validatorHandler.js';
import { isImageValid, notIsEmptyImage } from '../validatorsCustomHandler.js';

const createBicycleValidator = [
  //Sanitizar
  body('color').escape(),
  body('model').escape(),
  //validar
  check('color', 'El color es obligatorio.').notEmpty(),
  check('model', 'El modelo es obligatorio.').notEmpty(),
  check('file').custom((f, { req }) => notIsEmptyImage(req)),
  check('file').custom((f, { req }) => isImageValid(req)),
  validatorHandler
];

export {
  createBicycleValidator
}
