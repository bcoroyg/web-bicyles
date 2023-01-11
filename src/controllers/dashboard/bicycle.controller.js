import { Router } from 'express';
import { BicycleService } from '../../services/index.js';
import { authHandler, verifyRoleHandler } from '../../utils/middlewares/index.js';
import { roleHandler } from '../../utils/index.js';
import {
  createBicycleValidator,
  deleteBicycleValidator,
  getUpdateBicycleValidator,
  updateBicycleValidator,
} from '../../utils/validators/bicycle.validator.js';

const router = Router();
const bicycleService = BicycleService.getInstance();

router.get(
  '/',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  async (req, res, next) => {
    try {
      const bicycles = await bicycleService.getBicycles({});
      res.render('dashboard/bicycle/index', {
        title: 'Bicicletas',
        bicycles,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/create',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  async (req, res, next) => {
    try {
      res.render('dashboard/bicycle/create', {
        title: 'Nueva bicicleta',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  createBicycleValidator,
  async (req, res, next) => {
    const { body: bicycle } = req;
    try {
      await bicycleService.createBicycle({ bicycle, files: req.files });
      req.flash('success', 'Bicicleta creada exitosamente.');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:code/update',
  authHandler,
  getUpdateBicycleValidator,
  verifyRoleHandler([roleHandler.Admin]),
  async (req, res, next) => {
    const { code } = req.params;
    try {
      const bicycle = await bicycleService.getBicycle({ where: { code } });
      res.render('dashboard/bicycle/update', {
        title: 'Actualizar bicicleta',
        bicycle,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/update',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  updateBicycleValidator,
  async (req, res, next) => {
    const { body: bicycle } = req;
    try {
      await bicycleService.updateBicycle({ bicycle, files: req.files });
      req.flash('success', 'La bicicleta fue actualizada exitosamente.');
      res.redirect('/dashboard/bicycles');
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/delete/:bicycleId',
  authHandler,
  verifyRoleHandler([roleHandler.Admin]),
  deleteBicycleValidator,
  async (req, res, next) => {
    const { bicycleId } = req.params;
    try {
      await bicycleService.deleteBicycle({ bicycleId });
      //Para que la respuesta de axios sea enviada se debe devolver el estado 200 y el mensaje en send
      res.status(200).send('¡Bicicleta eliminada correctamente!');
    } catch (error) {
      next(error);
    }
  }
);

export default router;
