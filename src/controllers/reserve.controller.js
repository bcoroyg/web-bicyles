import { Router } from 'express';
import moment from 'moment';
import ReserveService from '../services/reserve.service.js';
import authHandler from '../utils/middlewares/authHandler.js';
import verifyRoleHandler from '../utils/middlewares/verifyRoleHandler.js';
import roleHandler from '../utils/roleHandler.js';

const router = Router();
const reserveService = ReserveService.getInstance();

router.get(
  '/',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  async (req, res, next) => {
    try {
      const reserves = await reserveService.getReserves({});
      res.render('dashboard/reserve/index', {
        title: 'Lista de reservas',
        reserves,
        moment,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
