import { Router } from 'express';
import moment from 'moment';
import ReserveService from '../services/reserve.service.js';
import authHandler from '../utils/middlewares/authHandler.js';
import verifyRoleHandler from '../utils/middlewares/verifyRoleHandler.js';
import roleHandler from '../utils/roleHandler.js';
import { updateReserveValidator } from '../utils/validators/reserve.validator.js';

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

router.get(
  '/:reserveId/update',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  async (req, res, next) => {
    const { reserveId } = req.params;
    try {
      const reserve = await reserveService.getReserveById({ reserveId });
      res.render('dashboard/reserve/update', {
        title: 'Actualizar Reserva',
        reserve,
        moment,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:reserveId/update',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  updateReserveValidator,
  async (req, res, next) => {
    const { reserveId } = req.params;
    const { body: reserve} = req;
    try {
      await reserveService.updateReserve({ reserveId, reserve });
      req.flash('success', 'Reserva actualizada exitosamente.')
      res.redirect('/dashboard/reserves');
    } catch (error) {
      next(error);
    }
  }
);


export default router;
