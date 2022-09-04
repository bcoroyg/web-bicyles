import { Router } from 'express';

const routerAPP = (app) => {
  const router = Router();
  app.use('/', router);
  router.use('/', (req, res) => {
    res.send('Welcome');
  });
};

export default routerAPP;
