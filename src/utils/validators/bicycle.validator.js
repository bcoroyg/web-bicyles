import { check, body } from 'express-validator';
import validatorHandler from '../middlewares/validatorHandler.js';
import { bicycleIdExists, isImageValid, notIsEmptyImage } from '../validatorsCustomHandler.js';

const createBicycleValidator = [
  //Sanitizar
  body('color').escape(),
  body('model').escape(),
  body('price').escape(),
  //validar
  check('color', 'El color es obligatorio.').notEmpty(),
  check('model', 'El modelo es obligatorio.').notEmpty(),
  check('price', 'El precio es obligatorio.').notEmpty(),
  check('file').custom((f, { req }) => notIsEmptyImage(req)),
  check('file').custom((f, { req }) => isImageValid(req)),
  validatorHandler
];

const updateBicycleValidator = [
  //Sanitizar
  body('color').escape(),
  body('model').escape(),
  body('price').escape(),
  //validar
  check('bicycleId', 'ID no es valido').isMongoId(),
  check('bicycleId').custom(bicycleIdExists),
  check('color', 'El color es obligatorio.').notEmpty(),
  check('model', 'El modelo es obligatorio.').notEmpty(),
  check('price', 'El precio es obligatorio.').notEmpty(),
  check('file').custom((f, { req }) => isImageValid(req)),
  validatorHandler
];

const deleteBicycleValidator = [
  check('bicycleId').custom(bicycleIdExists),
  validatorHandler,
];


export {
  createBicycleValidator,
  updateBicycleValidator,
  deleteBicycleValidator
}
