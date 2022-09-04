import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('index', {
      title: 'Web Bicicletas',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
