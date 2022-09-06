import { Router } from "express";
import BicycleService from "../services/bicycle.service.js";

const router = Router();
const bicycleService = BicycleService.getInstance();

router.get('/', async (req, res, next) => {
  try {
    const bicycles = await bicycleService.getBicycles({
      where: { reserved: false },
    });
    res.render('index', {
      title: 'Web Bicicletas',
      bicycles
    });
  } catch (error) {
    next(error);
  }
});

export default router;
