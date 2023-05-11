import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { executePolicies } from "../middlewars/auth.js";

const router = Router();

router.get('/product/:pro',executePolicies(["USER"]), cartController.insertProductToCart);
router.post('/purchase', executePolicies(["USER"]), cartController.purchase);

export default router;