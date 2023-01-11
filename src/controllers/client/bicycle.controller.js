import { Router } from 'express';
import { BicycleService } from '../../services/index.js';
import {
  authHandler,
  verifyRoleHandler,
} from '../../utils/middlewares/index.js';

import { roleHandler } from '../../utils/index.js';

const router = Router();
const bicycleService = BicycleService.getInstance();

router.get(
  '/',
  authHandler,
  verifyRoleHandler([roleHandler.Customer]),
  async (req, res, next) => {
    try {
      const bicycles = await bicycleService.getBicycles({
        where: { reserved: false },
      });
      res.render('client/bicycle', {
        title: 'Bicicletas',
        bicycles,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
