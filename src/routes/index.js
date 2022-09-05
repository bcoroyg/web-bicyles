import { Router } from 'express';
import homeController from './../controllers/home.controller.js';
import authController from './../controllers/auth.controller.js';
import bicycleController from './../controllers/bicycle.controller.js';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  router.use('/', homeController);
  router.use('/', authController);
  router.use('/dashboard/bicycles', bicycleController);
};

export default routerAPP;
