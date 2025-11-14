import { Router } from "express";
import {
  fetchProduct,
  fetchProducts,
  addProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = new Router();

router.get("/", fetchProducts);
router.get("/:id", fetchProduct);
router.post("/", authMiddleware, addProduct);

export default router;
