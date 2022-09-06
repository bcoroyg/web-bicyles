import { Router } from 'express';
import homeController from './../controllers/home.controller.js';
import authController from './../controllers/auth.controller.js';
import bicycleControllerClient from './../controllers/client/bicycle.controller.js';
import reserveControllerClient from '../controllers/client/reserve.controller.js';
import bicycleController from './../controllers/bicycle.controller.js';
import reserveController from '../controllers/reserve.controller.js';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  router.use('/', homeController);
  router.use('/', authController);
  router.use('/bicycles', bicycleControllerClient);
  router.use('/reserves', reserveControllerClient)
  router.use('/dashboard/bicycles', bicycleController);
  router.use('/dashboard/reserves', reserveController);
};

export default routerAPP;
