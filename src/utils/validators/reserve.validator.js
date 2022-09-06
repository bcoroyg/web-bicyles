import { check, body } from 'express-validator';
import validatorHandler from '../middlewares/validatorHandler.js';
import { bicycleIdExists, reserveIdExists, userIdExists } from '../validatorsCustomHandler.js';

const createReserveValidator = [
  //Sanitizar
  body('from').escape(),
  body('to').escape(),
  //validar
  check('user').custom((f, { req }) => userIdExists(req)),
  check('bicycleId').custom(bicycleIdExists),
  check('from', 'La fecha es obligatoria.').notEmpty(),
  check('to', 'La fecha es obligatoria.').notEmpty(),
  validatorHandler
];

const getUpdateReserveValidator = [
];

const updateReserveValidator = [
    //Sanitizar
    body('from').escape(),
    body('to').escape(),
    //validar
    check('reserveId').custom(reserveIdExists),
    check('from', 'La fecha es obligatoria.').notEmpty(),
    check('to', 'La fecha es obligatoria.').notEmpty(),
    validatorHandler
];

const deleteReserveValidator = [
  check('bicycleId').custom(bicycleIdExists),
  validatorHandler,
];


export {
  createReserveValidator,
  getUpdateReserveValidator,
  updateReserveValidator,
  deleteReserveValidator
}
