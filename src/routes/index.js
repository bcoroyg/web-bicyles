import { Router } from 'express';
import {
  authControllerClient,
  bicycleControllerClient,
  homeControllerClient,
  reserveControllerClient,
} from '../controllers/client/index.js';
import {
  bicycleController,
  reserveController,
} from '../controllers/dashboard/index.js';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  //client
  router.use('/', homeControllerClient);
  router.use('/', authControllerClient);
  router.use('/bicycles', bicycleControllerClient);
  router.use('/reserves', reserveControllerClient);
  //dashboard
  router.use('/dashboard/bicycles', bicycleController);
  router.use('/dashboard/reserves', reserveController);
};

export default routerAPP;
