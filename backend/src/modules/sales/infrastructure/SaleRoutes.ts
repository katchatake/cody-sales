import { Router } from "express";
import { SaleController } from "./SaleController";
import { validateRequest } from "../../../shared/infrastructure/middlewares/validateRequest";
import { verifyToken } from "../../../shared/infrastructure/middlewares/authMiddleware";
import { createSaleSchema } from "./SaleValid";

export const saleRoutes = Router();
const saleController = new SaleController();

// 1. POST /api/v1/sales - Save a sale
saleRoutes.post(
  "/",
  verifyToken, // Inject req.user to extract promotorId automatically
  validateRequest(createSaleSchema),
  saleController.createSale.bind(saleController),
);

// 2. GET /api/v1/sales - Get all sales
saleRoutes.get("/", verifyToken, saleController.getSales.bind(saleController));

// 3. GET /api/v1/sales/user/:id - Get sales by specific promotor (user)
saleRoutes.get(
  "/:id",
  verifyToken,
  saleController.getSalesByUser.bind(saleController),
);
