import config from '../../config/index.js';

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { error, stack };
  }
  return { error }; // Object.assign({}, err, stack)
};

const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const errorHandler = (err, req, res, next) => { //eslint-disable-line
  res.status(err.statusCode || 500);
  res.render('error', withErrorStack(err.message, err.stack));
};

export { logErrors, errorHandler };
