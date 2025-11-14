import { Router } from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

router.get("/", (req, res) => {
  res.send("routes set up well");
});

export { router };
