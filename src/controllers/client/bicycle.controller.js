import { Router } from "express";
import BicycleService from "../../services/bicycle.service.js";
import authHandler from "../../utils/middlewares/authHandler.js";
import verifyRoleHandler from "../../utils/middlewares/verifyRoleHandler.js";
import roleHandler from "../../utils/roleHandler.js";

const router = Router();
const bicycleService = BicycleService.getInstance();

router.get('/',
authHandler,
verifyRoleHandler([roleHandler.Customer]),
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
