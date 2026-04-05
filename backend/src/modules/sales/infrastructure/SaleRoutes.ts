import { Router } from "express";
import { SaleController } from "./SaleController";
import { validateRequest } from "../../../shared/infrastructure/middlewares/validateRequest";
import { verifyToken } from "../../../shared/infrastructure/middlewares/authMiddleware";
import { createSaleSchema } from "./SaleValid";

export const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.post(
  "/",
  verifyToken,
  validateRequest(createSaleSchema),
  saleController.createSale.bind(saleController),
);

saleRoutes.get("/", verifyToken, saleController.getSales.bind(saleController));

saleRoutes.get(
  "/:id",
  verifyToken,
  saleController.getSalesByUser.bind(saleController),
);
