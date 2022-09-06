import { Router } from 'express';
import homeController from './../controllers/home.controller.js';
import authController from './../controllers/auth.controller.js';
import bicycleController from './../controllers/bicycle.controller.js';
import bicycleControllerClient from './../controllers/client/bicycle.controller.js'
const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  router.use('/', homeController);
  router.use('/', authController);
  router.use('/bicycles', bicycleControllerClient);
  router.use('/dashboard/bicycles', bicycleController);
};

export default routerAPP;
