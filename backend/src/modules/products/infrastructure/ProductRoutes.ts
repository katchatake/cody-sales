import { Router } from "express";
import { ProductController } from "./ProductController";
import { verifyToken } from "../../../shared/infrastructure/middlewares/authMiddleware";

export const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", verifyToken, productController.getProducts.bind(productController));
