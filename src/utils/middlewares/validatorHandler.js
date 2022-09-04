import { matchedData, validationResult } from 'express-validator';

const validatorHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = {};
      errors.array().forEach((err) => {
        return (error = {
          ...error,
          [`${err.param}`]: err.msg,
        });
      });
      req.flash('errors', error);
      req.flash('values', req.body);
      return res.redirect('back');
    }
    //Limpiando body
    req.body = { ...matchedData(req) };
    next();
  } catch (error) {
    next(error);
  }
};

export default validatorHandler;
