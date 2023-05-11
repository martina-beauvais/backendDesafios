import { Router } from "express";
import productController from "../controllers/product.controller.js";
import uploader from "../services/upload.js";

const router = Router();

router.get('/', productController.getProducts);
router.post('/createProduct', uploader.single('thumbnail'), productController.createProduct)

export default router; 