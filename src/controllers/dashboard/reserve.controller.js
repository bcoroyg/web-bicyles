import { Router } from 'express';
import moment from 'moment';
import { ReserveService } from '../../services/index.js';
import {
  authHandler,
  verifyRoleHandler,
} from '../../utils/middlewares/index.js';
import { roleHandler } from '../../utils/index.js';
import {
  deleteReserveValidator,
  getUpdateReserveValidator,
  updateReserveValidator,
} from '../../utils/validators/reserve.validator.js';

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
  getUpdateReserveValidator,
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
    const { body: reserve } = req;
    try {
      await reserveService.updateReserve({ reserveId, reserve });
      req.flash('success', 'Reserva actualizada exitosamente.');
      res.redirect('/dashboard/reserves');
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/delete/:reserveId',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  deleteReserveValidator,
  async (req, res, next) => {
    const { reserveId } = req.params;
    try {
      await reserveService.deleteReserve({ reserveId });
      //Para que la respuesta de axios sea enviada se debe devolver el estado 200 y el mensaje en send
      res.status(200).send('Reserva eliminada correctamente!');
    } catch (error) {
      next(error);
    }
  }
);

export default router;
