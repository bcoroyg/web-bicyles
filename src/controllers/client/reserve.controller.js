import { Router } from 'express';
import ReserveService from '../../services/reserve.service.js';
import authHandler from '../../utils/middlewares/authHandler.js';
import verifyRoleHandler from '../../utils/middlewares/verifyRoleHandler.js';
import roleHandler from '../../utils/roleHandler.js';
import { createReserveValidator } from '../../utils/validators/reserve.validator.js';

const router = Router();
const reserveService = ReserveService.getInstance();

router.get(
  '/',
  authHandler,
  verifyRoleHandler([roleHandler.Customer]),
  async (req, res, next) => {
    try {
      const reserves = await reserveService.getReservesClient({
        userId: req.user._id,
      });
      res.render('client/reserve', {
        title: 'Mis reservas',
        reserves,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:bicycleId/create',
  authHandler,
  verifyRoleHandler([roleHandler.Customer]),
  createReserveValidator,
  async (req, res, next) => {
    const { body: reserve } = req;
    try {
      await reserveService.createReserve({
        reserve,
        userId: req.user._id,
      });
      req.flash('success', 'La reserva fue realizada exitosamente.');
      res.redirect('/bicycles');
    } catch (error) {
      next(error);
    }
  }
);

export default router;
