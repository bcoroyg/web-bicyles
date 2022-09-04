import { Router } from 'express';
import homeController from './../controllers/home.controller.js';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  router.use('/', homeController);
};

export default routerAPP;
