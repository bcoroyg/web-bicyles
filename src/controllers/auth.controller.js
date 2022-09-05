import { Router } from 'express';
import passport from 'passport';
import AuthService from '../services/auth.service.js';
import authHandler from '../utils/middlewares/authHandler.js';
import {
  confirmAccountAuthValidator,
  createUserValidator,
  forgotPasswordAuthValidator,
  getResetPasswordAuthValidator,
  resetPasswordAuthValidator,
} from '../utils/validators/auth.validator.js';

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

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios.',
  }),
  (req, res) => {
    if (req.user.role === 'Admin') {
      res.redirect('/dashboard/bicycles');
    } else {
      res.redirect('/bicycles');
    }
  }
);

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
    await authService.createUser({ user, host: req.headers.origin });
    req.flash('success', 'Se envio correo de activación de cuenta.');
    res.redirect('/login');
  } catch (error) {
    next(error);
  }
});

router.get(
  '/confirm-account/:token',
  confirmAccountAuthValidator,
  async (req, res, next) => {
    const { token } = req.params;
    try {
      await authService.confirmAccountUser({ token });
      //Enviando Mensaje y redireccionando a login
      req.flash('success', 'Su cuenta fue activada exitosamente.');
      res.redirect('/login');
    } catch (error) {
      next(error);
    }
  }
);

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

router.post(
  '/forgot-password',
  forgotPasswordAuthValidator,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      await authService.forgotPassword({ email, host: req.headers.origin });
      req.flash('success', 'Se envio correo de recuperación de contraseña.');
      res.redirect('/login');
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/reset-password/:token',
  getResetPasswordAuthValidator,
  async (req, res, next) => {
    const { token } = req.params;
    try {
      res.render('auth/reset-password', {
        title: 'Nueva contraseña',
        layout: 'auth',
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/reset-password/:token',
  resetPasswordAuthValidator,
  async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      await authService.resetPassword({ token, password });
      //Redirigir
      req.flash('success', 'Su contraseña fue restablecida exitosamente.');
      res.redirect('/login');
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/logout',
  authHandler,
  async (req, res, next) => {
    try {
      req.logout((err) => {
        if (err) {
            return console.log(err)
        }
        req.flash('success', 'Cerraste sesión correctamente.');
        return res.redirect('/login');
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
