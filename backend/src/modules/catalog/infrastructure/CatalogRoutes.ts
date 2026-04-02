import { Router } from "express";
import { CatalogController } from "./CatalogController";
import { verifyToken, forbidRoles } from "../../../shared/infrastructure/middlewares/authMiddleware";

export const catalogRoutes = Router();
const catalogController = new CatalogController();

catalogRoutes.get(
  "/",
  verifyToken,
  forbidRoles("PROMOTOR"),
  catalogController.getCategories.bind(catalogController)
);
