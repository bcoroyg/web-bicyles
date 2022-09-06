import { Router } from "express";
import BicycleService from "../../services/bicycle.service.js";
import authHandler from "../../utils/middlewares/authHandler.js";

const router = Router();
const bicycleService = BicycleService.getInstance();

router.get('/',
authHandler,
async (req, res, next) => {
  try {
    const bicycles = await bicycleService.getBicycles({});
    res.render('client/bicycle', {
      title: 'Bicicletas',
      bicycles
  });
  } catch (error) {
    next(error);
  }
});

export default router;
