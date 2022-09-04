import { Router } from 'express';
import AuthService from '../services/auth.service.js';
import { createUserValidator } from '../utils/validators/auth.validator.js';

const router = Router();
const authService = AuthService.getInstance();

router.get('/login', async (req, res, next) => {
  try {
    res.render('auth/login', {
      title: 'Inicio de sesión',
      layout: 'auth',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/create-account', async (req, res, next) => {
  try {
    res.render('auth/create-account', {
      title: 'Creación de cuenta',
      layout: 'auth',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/create-account', createUserValidator, async (req, res, next) => {
  const { body: user } = req;
  try {
    await authService.createUser({ user });
    req.flash('success', 'Se envio correo de activación de cuenta.');
    res.redirect('/login');
  } catch (error) {
    next(error);
  }
});

router.get('/forgot-password', async (req, res, next) => {
  try {
    res.render('auth/forgot-password', {
      title: 'Recuperación de contraseña',
      layout: 'auth',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
