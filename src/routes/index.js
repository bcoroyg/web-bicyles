import { Router } from 'express';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
};

export default routerAPP;
