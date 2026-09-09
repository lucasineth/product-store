import express from 'express';
import { getProducts, updateProduct, createProducts, deletedProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deletedProduct);

export default router;