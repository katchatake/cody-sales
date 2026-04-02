import { Router } from "express";
import { ProgressController } from "./ProgressController";
import {
  verifyToken,
  forbidRoles,
} from "../../../shared/infrastructure/middlewares/authMiddleware";

export const progressRoutes = Router();
const progressController = new ProgressController();

progressRoutes.get(
  "/",
  // verifyToken,
  // forbidRoles("PROMOTOR"),
  progressController.getProgress.bind(progressController),
);

progressRoutes.get(
  "/:id",
  // verifyToken,
  progressController.getProgressByPromotor.bind(progressController),
);
