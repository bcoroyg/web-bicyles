import { Router } from 'express';
import BicycleService from '../services/bicycle.service.js';
import authHandler from '../utils/middlewares/authHandler.js';
import { createBicycleValidator } from '../utils/validators/bicycle.validator.js';

const router = Router();
const bicycleService = BicycleService.getInstance();

router.get('/', authHandler, async (req, res, next) => {
  try {
    const bicycles = await bicycleService.getBicycles({});
    res.render('dashboard/bicycle/index', {
      title: 'Bicicletas',
      bicycles,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/create', authHandler, async (req, res, next) => {
  try {
    res.render('dashboard/bicycle/create', {
      title: 'Nueva bicicleta',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/create', authHandler, createBicycleValidator, async (req, res, next) => {
  const { body: bicycle } = req;
  try {
    await bicycleService.createBicycle({ bicycle });
    req.flash('success', 'Bicicleta creada exitosamente.');
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});

export default router;
