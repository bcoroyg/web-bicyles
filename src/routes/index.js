import { Router } from 'express';
import homeController from './../controllers/home.controller.js';
import authController from './../controllers/auth.controller.js';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  router.use('/', homeController);
  router.use('/', authController);
};

export default routerAPP;
