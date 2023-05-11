import { Router } from "express";
import { executePolicies } from "../middlewars/auth.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get('/home', executePolicies(["USER"]), viewsController.home);
router.get('/register', viewsController.register);
router.get('/login',viewsController.login);
router.get('/cart', executePolicies(["USER"]), viewsController.cart);

export default router;